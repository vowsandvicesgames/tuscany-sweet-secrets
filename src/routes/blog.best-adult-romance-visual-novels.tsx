import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import cover from "@/assets/cover-moon.webp";
import { PATREON_URL } from "@/lib/links";

const URL = "https://vowsandvicesstudio.com/blog/best-adult-romance-visual-novels";
const TITLE = "Best Adult Romance Visual Novels (2026 Guide)";
const DESCRIPTION =
  "A curated guide to the best adult romance visual novels — story-driven 18+ titles for fans of forbidden love, complex characters, and meaningful choices.";

export const Route = createFileRoute("/blog/best-adult-romance-visual-novels")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "article" },
      { property: "og:image", content: cover },
      { name: "twitter:image", content: cover },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          image: cover,
          author: { "@type": "Organization", name: "Vows & Vices Studio" },
          publisher: {
            "@type": "Organization",
            name: "Vows & Vices Studio",
            logo: { "@type": "ImageObject", url: "https://vowsandvicesstudio.com/favicon.png" },
          },
          mainEntityOfPage: URL,
        }),
      },
    ],
  }),
  component: BlogPage,
});

const titles = [
  {
    name: "Sweet Sin of Tuscany",
    studio: "Vows & Vices Studio",
    tagline: "Forbidden love, family secrets, and consequences in the Tuscan hills.",
    why: "A slow-burn, character-driven 18+ romance built around meaningful choices. If you love moody atmosphere, complex women, and stories where every decision matters, start here.",
  },
  {
    name: "Being a DIK",
    studio: "DrPinkCake",
    tagline: "College life, friendships, and rivalries with a strong romance core.",
    why: "Polished writing and animation with deep relationship trees. A modern benchmark for the adult visual novel genre.",
  },
  {
    name: "Doki Doki Literature Club Plus",
    studio: "Team Salvato",
    tagline: "A subversive psychological romance VN.",
    why: "Starts as a sweet anime romance and turns into something else entirely. A go-to recommendation when people ask for a story-first visual novel.",
  },
  {
    name: "Katawa Shoujo",
    studio: "Four Leaf Studios",
    tagline: "Five intertwined romance routes at Yamaku High.",
    why: "Free, full-length, and surprisingly tender. Often cited as the gateway romance VN for Western readers.",
  },
  {
    name: "Summertime Saga",
    studio: "DarkCookie",
    tagline: "A small-town life-sim with many romance routes.",
    why: "Sandbox-style 18+ romance with a huge cast. Lighter in tone than Sweet Sin of Tuscany — good if you want variety and exploration.",
  },
  {
    name: "Acting Lessons",
    studio: "DrPinkCake",
    tagline: "An emotional short-form romantic drama.",
    why: "A compact, heart-wrenching story. Proof that an adult visual novel can hit as hard as any prestige drama.",
  },
];

function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <article className="pt-32 pb-20 px-6">
        <header className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-glow/70">Guide · Adult Visual Novels</p>
          <h1 className="font-display text-4xl sm:text-6xl text-rose-glow mt-6 glow-text text-balance">
            Best Adult Romance Visual Novels
          </h1>
          <p className="mt-6 font-serif-italic text-rose-glow/85 text-lg sm:text-xl text-balance">
            A curated guide to story-driven 18+ visual novels — for fans of forbidden love, complex characters, and
            choices that actually matter.
          </p>
        </header>

        <section className="max-w-3xl mx-auto mt-16 space-y-6 text-lg font-serif leading-relaxed text-foreground/85">
          <p>
            Adult visual novels have grown far beyond their early reputation. The best titles in the genre are
            character-driven romances with branching choices, sharp writing, and atmospheres that linger long after the
            last scene. Below are the adult romance visual novels we keep coming back to, and what makes each one worth
            your evenings.
          </p>
          <p className="text-sm text-muted-foreground">
            All titles below are intended for mature audiences (18+). Check each studio's content notes before playing.
          </p>
        </section>

        <section className="max-w-4xl mx-auto mt-16 space-y-10">
          {titles.map((t, i) => (
            <article
              key={t.name}
              className="relative rounded-sm border border-crimson/30 bg-card/60 p-8 sm:p-10 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-crimson mb-3">No. {String(i + 1).padStart(2, "0")}</p>
              <h2 className="font-display text-2xl sm:text-3xl text-rose-glow mb-2">{t.name}</h2>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">{t.studio}</p>
              <p className="font-serif-italic text-rose-glow/85 mb-4">{t.tagline}</p>
              <p className="text-foreground/80 leading-relaxed">{t.why}</p>
            </article>
          ))}
        </section>

        <section className="max-w-3xl mx-auto mt-20">
          <div className="ornament-divider mb-10 text-xs tracking-[0.4em] uppercase">How we chose these</div>
          <div className="space-y-5 text-lg font-serif leading-relaxed text-foreground/85">
            <p>
              We focused on titles where the romance is the spine of the story, not a side activity. Each entry above
              earns its place through one or more of: distinctive writing, branching choices with real consequences,
              memorable characters, or a mood you can feel from the first scene.
            </p>
            <p>
              If you're new to the genre, start with a single-route, story-first title like Katawa Shoujo or Doki Doki
              Literature Club Plus. If you already know what you like, dive into a longer arc such as Being a DIK — or
              the slow-burn forbidden-love story of <em>Sweet Sin of Tuscany</em>.
            </p>
          </div>
        </section>

        <aside className="max-w-3xl mx-auto mt-20 relative overflow-hidden rounded-sm border border-crimson/40 bg-card/60 p-8 sm:p-10 text-center backdrop-blur">
          <div className="absolute inset-0 bg-ember opacity-40 pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl text-rose-glow glow-text">
              Try <span className="font-serif-italic text-crimson">Sweet Sin of Tuscany</span>
            </h2>
            <p className="mt-4 font-serif text-foreground/80 max-w-xl mx-auto">
              Our debut 18+ visual novel — a story of long-lost, forbidden love and a family's web of lies, set in the
              Tuscan hills.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/story"
                className="inline-flex items-center px-6 py-3 font-display tracking-[0.2em] uppercase text-xs bg-romance border border-crimson/40 rounded-sm hover:shadow-[0_0_60px_oklch(0.52_0.20_18/0.5)] transition-all"
              >
                Read the Story
              </Link>
              <Link
                to="/world"
                className="inline-flex items-center px-6 py-3 font-display tracking-[0.2em] uppercase text-xs text-rose-glow border border-rose-glow/30 rounded-sm hover:bg-rose-glow/5 transition-all"
              >
                Meet the Characters
              </Link>
              <a
                href={PATREON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 font-display tracking-[0.2em] uppercase text-xs text-rose-glow border border-crimson/40 rounded-sm hover:bg-romance/40 transition-all"
              >
                Support on Patreon ↗
              </a>
            </div>
          </div>
        </aside>
      </article>

      <SiteFooter />
    </div>
  );
}
