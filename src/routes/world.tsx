import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import sweetSinLogo from "@/assets/sweet-sin-logo.png";
import cover from "@/assets/cover-moon.webp";
import vineyard from "@/assets/vineyard.jpg";
import villa from "@/assets/villa-interior.jpg";
import hero from "@/assets/tuscany-hero.jpg";

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
      { property: "og:image", content: cover },
      { name: "twitter:image", content: cover },
    ],
  }),
  component: GamesPage,
});

const screenshots = [
  { img: villa, caption: "Inside the villa" },
  { img: vineyard, caption: "The old vineyard" },
  { img: hero, caption: "Tuscan hills at dusk" },
  { img: cover, caption: "Cast under the moon" },
];

function GamesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* INTRO */}
      <section className="relative pt-40 pb-16 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-rose-glow/70">
          Discover the games of Vows & Vices Studio. Sweet Sin of Tuscany — our first 18+ visual novel of forbidden love
          and family secrets.
        </p>
        <img
          src={sweetSinLogo}
          alt="Sweet Sin of Tuscany"
          className="relative z-10 max-w-[80%] max-h-[80%] object-contain drop-shadow-[0_0_40px_oklch(0.52_0.20_18/0.5)]"
        />
        <p className="mt-6 max-w-2xl mx-auto font-serif-italic text-rose-glow/80 text-lg">
          Stories made to be felt. Romance you choose, and consequences you carry.
        </p>
      </section>

      {/* SWEET SIN OF TUSCANY */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <article className="relative rounded-sm border border-border/60 bg-card/40 overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-0">
            {/* Logo / Cover */}
            <div className="relative aspect-square lg:aspect-auto bg-ink flex items-center justify-center p-10 border-b lg:border-b-0 lg:border-r border-border/60">
              <img
                src={cover}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
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

        {/* SCREENSHOTS */}
        <div className="mt-16">
          <div className="ornament-divider mb-8 text-xs tracking-[0.4em] uppercase">Screenshots</div>
          <p className="text-center text-sm text-muted-foreground mb-10">
            Placeholder gallery — replace with in-game screenshots.
          </p>
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
            Vows &amp; Vices Studio is just getting started. Future titles will be announced here.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
