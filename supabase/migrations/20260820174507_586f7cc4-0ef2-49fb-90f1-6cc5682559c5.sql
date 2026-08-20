ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS patreon_post_id text;
CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_patreon_post_id_key ON public.blog_posts (patreon_post_id) WHERE patreon_post_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS public.patreon_sync_config (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  cron_secret text NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  last_run_at timestamptz,
  last_result text
);
GRANT ALL ON public.patreon_sync_config TO service_role;
ALTER TABLE public.patreon_sync_config ENABLE ROW LEVEL SECURITY;
INSERT INTO public.patreon_sync_config (id) VALUES (true) ON CONFLICT (id) DO NOTHING;

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.run_patreon_sync()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_secret text;
BEGIN
  SELECT cron_secret INTO v_secret FROM public.patreon_sync_config WHERE id;
  IF v_secret IS NULL THEN RETURN; END IF;
  PERFORM net.http_post(
    url := 'https://project--6f4b607a-14d4-4f20-9c20-8b694796039c.lovable.app/api/public/patreon-sync',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-sync-secret', v_secret),
    body := '{}'::jsonb
  );
  UPDATE public.patreon_sync_config SET last_run_at = now() WHERE id;
END;
$$;

REVOKE ALL ON FUNCTION public.run_patreon_sync() FROM PUBLIC, anon, authenticated;

SELECT cron.unschedule('patreon-sync') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'patreon-sync');
SELECT cron.schedule('patreon-sync', '*/30 * * * *', $$SELECT public.run_patreon_sync();$$);