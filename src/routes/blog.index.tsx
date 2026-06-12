import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { listPublishedPosts } from "@/lib/blog.functions";

const URL = "https://vowsandvicesstudio.com/blog";
const TITLE = "Blog — Vows & Vices Studio";
const DESCRIPTION = "Dev logs, guides, and stories from Vows & Vices Studio.";

export const Route = createFileRoute("/blog/")({
  loader: () => listPublishedPosts(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const data = Route.useLoaderData();
  const posts = data.posts;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-32 pb-20 px-6">
        <header className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-glow/70">Journal</p>
          <h1 className="font-display text-4xl sm:text-6xl text-rose-glow mt-6 glow-text text-balance">Blog</h1>
          <p className="mt-6 font-serif-italic text-rose-glow/85 text-lg text-balance">
            Dev logs, guides, and stories from the studio.
          </p>
        </header>

        <section className="max-w-4xl mx-auto mt-16 grid gap-6 sm:grid-cols-2">

          {posts.map((p: any) => (
            <Link
              key={p.id}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group rounded-sm border border-crimson/30 bg-card/60 p-6 hover:border-crimson/60 transition-colors backdrop-blur"
            >
              {p.cover_image_url && (
                <img
                  src={p.cover_image_url}
                  alt=""
                  loading="lazy"
                  className="w-full h-40 object-cover rounded-sm mb-4 opacity-90 group-hover:opacity-100 transition-opacity"
                />
              )}
              <p className="text-xs uppercase tracking-[0.3em] text-crimson mb-2">
                {p.published_at
                  ? new Date(p.published_at).toISOString().slice(0, 10).split("-").reverse().join("/")
                  : "Draft"}
              </p>
              <h2 className="font-display text-xl text-rose-glow group-hover:text-crimson transition-colors">
                {p.title}
              </h2>
              {p.excerpt && (
                <p className="mt-3 text-foreground/75 text-sm leading-relaxed">{p.excerpt}</p>
              )}
            </Link>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
