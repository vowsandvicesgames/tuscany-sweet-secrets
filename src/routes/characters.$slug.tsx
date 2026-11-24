import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { characters, getCharacter, heroineSlugs } from "@/lib/characters";
import { ITCH_URL, PATREON_URL, DISCORD_URL } from "@/lib/links";
import { trackItchClick, trackPatreonClick, trackDiscordClick } from "@/lib/analytics";

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
    const title = `${c.name} (${c.role}) — Sweet Sin of Tuscany | Vows & Vices`;
    const desc = `Meet ${c.name} (${c.role}) from Sweet Sin of Tuscany by Vows & Vices — an 18+ romance visual novel for fans of games like Eternum. Read ${c.isProtagonist ? "his" : "her"} story.`;
    const url = `${BASE}/characters/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
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
      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
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
              {c.isProtagonist
                ? "The man who comes home. You choose his name."
                : "A heroine of Sweet Sin of Tuscany, told from Luca's perspective."}
            </p>
            <div className="font-serif text-lg leading-relaxed text-foreground/85 whitespace-pre-line">{c.description}</div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={ITCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackItchClick(window.location.pathname)}
                className="inline-flex px-6 py-3 font-display tracking-[0.2em] uppercase text-sm bg-romance border border-crimson/40 rounded-sm"
              >
                {c.isProtagonist ? "Play Episode 1 Free" : `Meet ${c.name} — Play Episode 1 Free`}
              </a>
              <a
                href={PATREON_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPatreonClick(window.location.pathname)}
                className="inline-flex px-6 py-3 font-display tracking-[0.2em] uppercase text-sm text-rose-glow border border-crimson/40 hover:border-crimson hover:bg-romance/40 transition-all duration-500 rounded-sm"
              >
                Support us on Patreon
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDiscordClick(window.location.pathname)}
                className="inline-flex items-center gap-2 px-6 py-3 font-display tracking-[0.2em] uppercase text-sm text-foreground bg-discord hover:bg-discord-hover rounded-sm transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.583 18.583 0 0 0-5.487 0 13.392 13.392 0 0 0-.617-1.249.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join the Discord
              </a>
            </div>
          </article>
        </div>
        <nav className="mt-16">
          <div className="ornament-divider mb-6 text-xs tracking-[0.4em] uppercase">
            {c.isProtagonist ? "The heroines" : "Other heroines"}
          </div>
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
