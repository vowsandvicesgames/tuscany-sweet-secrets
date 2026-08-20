CREATE OR REPLACE FUNCTION public.run_patreon_patrons_sync()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_secret text;
BEGIN
  SELECT cron_secret INTO v_secret FROM public.patreon_sync_config WHERE id;
  IF v_secret IS NULL THEN RETURN; END IF;
  PERFORM net.http_post(
    url := 'https://project--6f4b607a-14d4-4f20-9c20-8b694796039c.lovable.app/api/public/patreon-patrons-sync',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-sync-secret', v_secret),
    body := '{}'::jsonb
  );
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.run_patreon_patrons_sync() FROM PUBLIC, anon, authenticated;

SELECT cron.schedule(
  'patreon-patrons-sync',
  '17 */6 * * *',
  $cron$ SELECT public.run_patreon_patrons_sync(); $cron$
);