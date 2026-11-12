import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPublishedPost } from "@/lib/blog.functions";

const BASE = "https://vowsandvicesstudio.com";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const res = await getPublishedPost({ data: { slug: params.slug } });
    if (!res.post) throw notFound();
    return res;
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Post not found" }] };
    const url = `${BASE}/blog/${params.slug}`;
    const desc = post.excerpt ?? post.title;
    return {
      meta: [
        { title: `${post.title} — Vows & Vices` },
        { name: "description", content: desc },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        ...(post.cover_image_url
          ? [
              { property: "og:image", content: post.cover_image_url },
              { name: "twitter:image", content: post.cover_image_url },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: desc,
            image: post.cover_image_url ?? undefined,
            datePublished: post.published_at,
            author: { "@type": "Organization", name: "Vows & Vices Studio" },
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center text-foreground/70">{(error as Error).message}</div>
  ),
  component: PostPage,
});

function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-40 pb-20 px-6 text-center">
        <h1 className="font-display text-4xl text-rose-glow">Post not found</h1>
        <Link to="/blog" className="mt-6 inline-block text-crimson hover:underline">
          ← Back to the blog
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function PostPage() {
  const data = Route.useLoaderData();
  const post = data.post!;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <article className="pt-32 pb-20 px-6">
        <header className="max-w-3xl mx-auto text-center">
          {post.published_at && (
            <p className="text-xs uppercase tracking-[0.4em] text-rose-glow/70">
              {new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          <h1 className="font-display text-4xl sm:text-5xl text-rose-glow mt-6 glow-text text-balance">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-6 font-serif-italic text-rose-glow/85 text-lg sm:text-xl text-balance">
              {post.excerpt}
            </p>
          )}
        </header>

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt=""
            className="max-w-3xl mx-auto mt-12 w-full rounded-sm border border-crimson/30"
          />
        )}

        <section
          className="max-w-3xl mx-auto mt-12 prose prose-invert prose-2xl font-serif leading-relaxed text-foreground/85 prose-headings:font-display prose-headings:text-rose-glow prose-a:text-crimson prose-strong:text-rose-glow prose-img:rounded-sm prose-img:border prose-img:border-crimson/30"
          dangerouslySetInnerHTML={{ __html: post.body ?? "" }}
        />


        <div className="max-w-3xl mx-auto mt-16 text-center">
          <Link to="/blog" className="text-crimson hover:underline text-sm tracking-widest uppercase">
            ← All posts
          </Link>
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
