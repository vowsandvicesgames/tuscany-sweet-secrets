import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PATREON_URL } from "@/lib/links";
import sweetSinLogo from "@/assets/sweet-sin-logo.png";
import coverBeach from "@/assets/cover-beach-1.webp";
import tuscanHills from "@/assets/a08.webp";
import villa from "@/assets/g09.webp";
import sofiaSwing from "@/assets/cover-no1-big-moon.webp";
import characterSofia from "@/assets/character-sofia.webp";
import characterEmily from "@/assets/character-emily.webp";
import characterGloria from "@/assets/character-gloria.webp";
import characterLuca from "@/assets/character-luca.webp";
import characterBianca from "@/assets/character-bianca.webp";
import characterMia from "@/assets/character-mia.webp";

export const Route = createFileRoute("/world")({
  head: () => ({
    meta: [
      { title: "Games — Vows & Vices Studio" },
      {
        name: "description",
        content:
          "Discover the games of Vows & Vices Studio. Sweet Sin of Tuscany — our first 18+ visual novel of forbidden love and family secrets.",
      },
      { property: "og:title", content: "Games — Vows & Vices Studio" },
      {
        property: "og:description",
        content: "Sweet Sin of Tuscany — our first 18+ visual novel from Vows & Vices Studio.",
      },
      { property: "og:image", content: coverBeach },
      { name: "twitter:image", content: coverBeach },
    ],
  }),
  component: GamesPage,
});

const characters = [
  { img: characterSofia, name: "Sofia" },
  { img: characterEmily, name: "Emily" },
  { img: characterGloria, name: "Gloria" },
  { img: characterLuca, name: "Luca" },
  { img: characterBianca, name: "Bianca" },
  { img: characterMia, name: "Mia" },
];

const screenshots = [
  { img: villa, caption: "Inside the villa" },
  { img: sofiaSwing, caption: "Moon called" },
  { img: tuscanHills, caption: "Tuscan hills" },
  { img: coverBeach, caption: "Under the Tuscan sun" },
];

function GamesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* INTRO */}
      <section className="relative pt-40 pb-16 px-6 text-center">
        <p className="mt-6 max-w-2xl mx-auto font-serif-italic text-rose-glow/80 text-lg">
          Discover the games of Vows & Vices Studio. Sweet Sin of Tuscany — our first 18+ visual novel of forbidden love
          and family secrets.
        </p>
      </section>

      {/* SWEET SIN OF TUSCANY */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <article className="relative rounded-sm border border-border/60 bg-card/40 overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-0">
            {/* Logo / Cover */}
            <div className="relative aspect-square lg:aspect-auto bg-ink flex items-center justify-center p-10 border-b lg:border-b-0 lg:border-r border-border/60">
              <img
                src={sweetSinLogo}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-transparent to-background/60" />
            </div>

            {/* Info */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.3em] text-crimson mb-3">Featured · Coming Soon</p>
              <h2 className="font-display text-4xl sm:text-5xl text-rose-glow mb-5">
                Sweet Sin <span className="font-serif-italic text-crimson">of Tuscany</span>
              </h2>
              <p className="font-serif-italic text-rose-glow/85 text-lg mb-5">
                Our first 18+ visual novel — a story of long lost, forbidden love and the consequences of years of
                forced separation.
              </p>
              <p className="text-foreground/75 leading-relaxed mb-8">
                While taking a deserved week off in the Tuscan hills, an unexpected visitor turns your world upside
                down. Your family's web of lies — and the dark secret it hides — is about to unravel.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/story"
                  className="inline-flex items-center px-6 py-3 font-display tracking-[0.2em] uppercase text-xs bg-romance border border-crimson/40 rounded-sm hover:shadow-[0_0_60px_oklch(0.52_0.20_18/0.5)] transition-all"
                >
                  Read the Story
                </Link>
                <span className="inline-flex items-center px-4 py-3 font-display tracking-[0.2em] uppercase text-xs text-muted-foreground border border-border/60 rounded-sm">
                  Mature · 18+
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* CHARACTERS */}
        <div className="mt-16">
          <div className="ornament-divider mb-3 text-xs tracking-[0.4em] uppercase">Meet the characters</div>
          <p className="text-center text-sm text-muted-foreground mb-8 font-serif-italic">
            From the first chapter — and many more to come in next chapters.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {characters.map((c) => (
              <figure
                key={c.name}
                className="relative aspect-[3/5] overflow-hidden rounded-sm border border-border/60 bg-card group"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="w-full h-full object-contain object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <figcaption className="absolute bottom-0 inset-x-0 p-3 text-xs uppercase tracking-[0.3em] text-rose-glow/90 bg-gradient-to-t from-ink/95 to-transparent text-center">
                  {c.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* SCREENSHOTS */}
        <div className="mt-16">
          <div className="ornament-divider mb-8 text-xs tracking-[0.4em] uppercase">Screenshots</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {screenshots.map((s, i) => (
              <figure
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border/60 bg-card group"
              >
                <img
                  src={s.img}
                  alt={s.caption}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <figcaption className="absolute bottom-0 inset-x-0 p-3 text-xs uppercase tracking-[0.2em] text-rose-glow/90 bg-gradient-to-t from-ink/90 to-transparent">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* MORE COMING */}
        <div className="mt-20 text-center border-t border-border/40 pt-16">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-glow/60 mb-4">More to come</p>
          <h3 className="font-display text-3xl sm:text-4xl text-rose-glow/90">
            New stories are being whispered in the studio.
          </h3>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Vows &amp; Vices Studio is just getting started. Future chapters will be announced here.
          </p>
          <p className="mt-6 font-serif-italic text-rose-glow/85 text-lg max-w-2xl mx-auto">
            Every whisper, every reveal, and every new chapter is first shared with our Patreon family — join us there
            for sneak peeks, behind-the-scenes stories, and announcements before anyone else.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={PATREON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 font-display tracking-[0.2em] uppercase text-xs bg-romance border border-crimson/40 rounded-sm hover:shadow-[0_0_60px_oklch(0.52_0.20_18/0.5)] transition-all"
            >
              Join us on Patreon
            </a>
          </div>

          <p className="mt-6 text-sm text-muted-foreground max-w-xl mx-auto">
            If our story and characters have stirred something in you, consider supporting the studio — your patronage
            fuels richer worlds, deeper romance, and the quality this craft deserves.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
