CREATE TABLE public.patron_automations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  trigger_type text not null check (trigger_type in ('new_paid_patron','new_free_patron','tier_upgrade','tier_downgrade','patron_cancelled')),
  template_name text not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.patron_automations TO authenticated;
GRANT ALL ON public.patron_automations TO service_role;
ALTER TABLE public.patron_automations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage automations" ON public.patron_automations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.patron_events (
  id uuid primary key default gen_random_uuid(),
  patreon_member_id text not null,
  email text,
  full_name text,
  event_type text not null,
  details jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  automation_id uuid references public.patron_automations(id) on delete set null,
  error text,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);
CREATE INDEX patron_events_status_idx ON public.patron_events (status, created_at);
GRANT SELECT ON public.patron_events TO authenticated;
GRANT ALL ON public.patron_events TO service_role;
ALTER TABLE public.patron_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read patron events" ON public.patron_events FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

CREATE TRIGGER patron_automations_updated_at BEFORE UPDATE ON public.patron_automations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.patron_automations (name, trigger_type, template_name, enabled) VALUES
  ('Welcome paid patron','new_paid_patron','patron-welcome-paid', true),
  ('Welcome free member','new_free_patron','patron-welcome-free', true),
  ('Tier upgraded','tier_upgrade','patron-tier-changed', true),
  ('Tier downgraded','tier_downgrade','patron-tier-changed', false),
  ('Patron cancelled','patron_cancelled','patron-cancelled', false);