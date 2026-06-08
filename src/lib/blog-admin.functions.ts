import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const upsertSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(120).regex(slugRe, "Use lowercase letters, numbers, and dashes"),
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).optional().nullable(),
  body: z.string().max(100_000),
  cover_image_url: z.string().url().max(2000).optional().nullable().or(z.literal("")),
  published: z.boolean(),
});

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error(error.message);
  if (!data) throw new Response("Forbidden: admin only", { status: 403 });
}

export const adminListPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("blog_posts")
      .select("id, slug, title, published, published_at, updated_at")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { posts: data ?? [] };
  });

export const adminGetPost = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data: post, error } = await context.supabase
      .from("blog_posts")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { post };
  });

export const adminUpsertPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => upsertSchema.parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const cover = data.cover_image_url ? data.cover_image_url : null;
    const payload = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt ?? null,
      body: data.body,
      cover_image_url: cover,
      published: data.published,
      published_at: data.published ? new Date().toISOString() : null,
      author_id: context.userId,
    };

    if (data.id) {
      // Keep original published_at if already published
      const { data: existing } = await context.supabase
        .from("blog_posts")
        .select("published_at, published")
        .eq("id", data.id)
        .maybeSingle();
      const published_at =
        data.published && existing?.published && existing.published_at
          ? existing.published_at
          : payload.published_at;
      const { data: row, error } = await context.supabase
        .from("blog_posts")
        .update({ ...payload, published_at })
        .eq("id", data.id)
        .select("id, slug")
        .single();
      if (error) throw new Error(error.message);
      return { post: row };
    }

    const { data: row, error } = await context.supabase
      .from("blog_posts")
      .insert(payload)
      .select("id, slug")
      .single();
    if (error) throw new Error(error.message);
    return { post: row };
  });

export const adminDeletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) throw new Error(error.message);
    return { isAdmin: !!data };
  });
