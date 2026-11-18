import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { characters, getCharacter, heroineSlugs } from "@/lib/characters";
import { ITCH_URL } from "@/lib/links";
import { trackItchClick } from "@/lib/analytics";

const BASE = "https://vowsandvicesstudio.com";

export const Route = createFileRoute("/characters/$slug")({
  loader: ({ params }) => {
    const c = getCharacter(params.slug);
    if (!c) throw notFound();
    return { slug: c.slug };
  },
  head: ({ params, loaderData }) => {
    const c = loaderData ? getCharacter(loaderData.slug) : undefined;
    if (!c) return { meta: [{ title: "Character not found — Sweet Sin of Tuscany" }, { name: "robots", content: "noindex" }] };
    const title = `${c.name} — ${c.role} | Sweet Sin of Tuscany Characters`;
    const url = `${BASE}/characters/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: c.seoDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: c.seoDescription },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <Link to="/world" className="text-crimson underline">Back to the characters</Link>
    </div>
  ),
  component: CharacterPage,
});

function CharacterPage() {
  const { slug } = Route.useLoaderData();
  const c = getCharacter(slug)!;
  const others = characters.filter((o) => heroineSlugs.includes(o.slug) && o.slug !== slug);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
        <Link to="/world" className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-rose-glow">
          ← All characters
        </Link>
        <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
          <img
            src={c.img}
            alt={`${c.name}, ${c.alt}`}
            width={600}
            height={1000}
            className="w-full rounded-sm border border-border/60 bg-card object-contain md:sticky md:top-28"
          />
          <article>
            <p className="text-xs uppercase tracking-[0.3em] text-crimson mb-3">{c.role}</p>
            <h1 className="font-display text-4xl sm:text-5xl text-rose-glow glow-text mb-2">{c.name}</h1>
            <p className="font-serif-italic text-muted-foreground mb-8">
              A heroine of Sweet Sin of Tuscany, told from Luca's perspective.
            </p>
            <div className="font-serif text-lg leading-relaxed text-foreground/85 whitespace-pre-line">{c.description}</div>
            <a
              href={ITCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackItchClick(window.location.pathname)}
              className="mt-10 inline-flex px-6 py-3 font-display tracking-[0.2em] uppercase text-sm bg-romance border border-crimson/40 rounded-sm"
            >
              Meet {c.name} — Play Episode 1 Free
            </a>
          </article>
        </div>
        <nav className="mt-16">
          <div className="ornament-divider mb-6 text-xs tracking-[0.4em] uppercase">Other heroines</div>
          <div className="flex flex-wrap justify-center gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/characters/$slug"
                params={{ slug: o.slug }}
                className="px-5 py-2 text-sm uppercase tracking-[0.2em] text-rose-glow border border-crimson/40 hover:border-crimson rounded-sm"
              >
                {o.name}
              </Link>
            ))}
          </div>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
