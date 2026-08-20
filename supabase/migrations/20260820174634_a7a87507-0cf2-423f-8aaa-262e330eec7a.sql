DELETE FROM public.blog_posts WHERE patreon_post_id IS NOT NULL AND created_at > now() - interval '30 minutes';
ALTER TABLE public.patreon_sync_config ADD COLUMN IF NOT EXISTS sync_since timestamptz NOT NULL DEFAULT now();
UPDATE public.patreon_sync_config SET sync_since = now() WHERE id;