CREATE TABLE public.patreon_patrons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patreon_member_id text NOT NULL UNIQUE,
  patreon_user_id text,
  email text,
  full_name text,
  patron_status text,
  last_charge_status text,
  last_charge_date timestamptz,
  currently_entitled_amount_cents integer NOT NULL DEFAULT 0,
  lifetime_support_cents integer NOT NULL DEFAULT 0,
  tier_names text[] NOT NULL DEFAULT '{}',
  pledge_relationship_start timestamptz,
  is_follower boolean NOT NULL DEFAULT false,
  last_synced_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.patreon_patrons TO authenticated;
GRANT ALL ON public.patreon_patrons TO service_role;

ALTER TABLE public.patreon_patrons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read patrons"
  ON public.patreon_patrons FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER patreon_patrons_updated_at
  BEFORE UPDATE ON public.patreon_patrons
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX patreon_patrons_email_idx ON public.patreon_patrons (email);
CREATE INDEX patreon_patrons_status_idx ON public.patreon_patrons (patron_status);