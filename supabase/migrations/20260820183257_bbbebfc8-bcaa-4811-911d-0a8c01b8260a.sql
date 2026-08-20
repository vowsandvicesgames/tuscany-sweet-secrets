CREATE OR REPLACE FUNCTION public.run_patron_automations()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  secret text;
BEGIN
  SELECT cron_secret INTO secret FROM public.patreon_sync_config LIMIT 1;
  IF secret IS NULL THEN RETURN; END IF;
  PERFORM net.http_post(
    url := 'https://project--6f4b607a-14d4-4f20-9c20-8b694796039c.lovable.app/api/public/patron-automations-run',
    headers := jsonb_build_object('Content-Type','application/json','x-sync-secret', secret),
    body := '{}'::jsonb
  );
END;
$$;
REVOKE EXECUTE ON FUNCTION public.run_patron_automations() FROM PUBLIC, anon, authenticated;

SELECT cron.schedule('run-patron-automations', '*/15 * * * *', $$SELECT public.run_patron_automations();$$);