import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminGetPost, adminUpsertPost } from "@/lib/blog-admin.functions";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/blog/$id")({
  head: () => ({ meta: [{ title: "Edit post" }, { name: "robots", content: "noindex" }] }),
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const get = useServerFn(adminGetPost);
  const upsert = useServerFn(adminUpsertPost);

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: undefined as string | undefined,
    slug: "",
    title: "",
    excerpt: "",
    body: "",
    cover_image_url: "",
    published: false,
  });

  useEffect(() => {
    if (isNew) return;
    (async () => {
      try {
        const res = await get({ data: { id } });
        if (res.post) {
          setForm({
            id: res.post.id,
            slug: res.post.slug,
            title: res.post.title,
            excerpt: res.post.excerpt ?? "",
            body: res.post.body ?? "",
            cover_image_url: res.post.cover_image_url ?? "",
            published: res.post.published,
          });
        }
      } catch (e: any) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onChange = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const autoSlug = () => {
    if (form.slug) return;
    const s = form.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80);
    if (s) onChange("slug", s);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await upsert({
        data: {
          id: form.id,
          slug: form.slug,
          title: form.title,
          excerpt: form.excerpt || null,
          body: form.body,
          cover_image_url: form.cover_image_url || null,
          published: form.published,
        },
      });
      toast.success("Saved");
      if (isNew && res.post?.id) navigate({ to: "/admin/blog/$id", params: { id: res.post.id } });
    } catch (e: any) {
      toast.error(e.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Shell>
        <p className="text-foreground/70">Loading…</p>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-rose-glow">{isNew ? "New post" : "Edit post"}</h1>
        <Link to="/admin/blog" className="text-sm text-foreground/60 hover:text-rose-glow">
          ← All posts
        </Link>
      </div>

      <form onSubmit={save} className="space-y-5">
        <Field label="Title">
          <input
            required
            value={form.title}
            onChange={(e) => onChange("title", e.target.value)}
            onBlur={autoSlug}
            className="input"
          />
        </Field>
        <Field label="Slug" hint="Lowercase, dashes only. Becomes /blog/your-slug">
          <input
            required
            pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
            value={form.slug}
            onChange={(e) => onChange("slug", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Excerpt" hint="Short summary shown in the list & meta description.">
          <textarea
            rows={2}
            maxLength={500}
            value={form.excerpt}
            onChange={(e) => onChange("excerpt", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Cover image URL" hint="Optional. Used as the social-share image.">
          <input
            type="url"
            value={form.cover_image_url}
            onChange={(e) => onChange("cover_image_url", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Body" hint="Plain text or markdown-style. Line breaks are preserved.">
          <textarea
            required
            rows={18}
            value={form.body}
            onChange={(e) => onChange("body", e.target.value)}
            className="input font-mono text-sm"
          />
        </Field>

        <label className="flex items-center gap-3 text-sm text-foreground/80">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => onChange("published", e.target.checked)}
          />
          Published (visible on the public blog)
        </label>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 font-display tracking-[0.2em] uppercase text-xs bg-romance border border-crimson/40 rounded-sm hover:shadow-[0_0_60px_oklch(0.52_0.20_18/0.5)] transition-all disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          {!isNew && form.published && (
            <a
              href={`/blog/${form.slug}`}
              target="_blank"
              rel="noopener"
              className="px-6 py-3 font-display tracking-[0.2em] uppercase text-xs text-rose-glow border border-rose-glow/30 rounded-sm hover:bg-rose-glow/5 transition-all"
            >
              View ↗
            </a>
          )}
        </div>
      </form>

      <style>{`
        .input {
          width: 100%;
          background: hsl(var(--background, 0 0% 5%));
          border: 1px solid oklch(0.52 0.20 18 / 0.3);
          border-radius: 2px;
          padding: 0.75rem 1rem;
          color: hsl(var(--foreground, 0 0% 95%));
          outline: none;
        }
        .input:focus { border-color: oklch(0.52 0.20 18 / 0.7); }
      `}</style>
    </Shell>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-rose-glow/80 mb-2">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-foreground/50">{hint}</p>}
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
