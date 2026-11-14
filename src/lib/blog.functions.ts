import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const slugSchema = z.object({ slug: z.string().min(1).max(200) });

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image_url, thumbnail_url, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(100);
  if (error) throw new Error(error.message);
  return { posts: data ?? [] };
});

export const getPublishedPost = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => slugSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: post, error } = await supabaseAdmin
      .from("blog_posts")
      .select("id, slug, title, excerpt, body, cover_image_url, published_at")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { post };
  });

export const listSitemapSlugs = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("slug, published_at")
    .eq("published", true);
  if (error) throw new Error(error.message);
  return { posts: data ?? [] };
});
