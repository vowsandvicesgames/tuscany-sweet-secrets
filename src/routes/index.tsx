import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Embers } from "@/components/Embers";
import logo from "@/assets/sweet-sin-logo.png";
import hero from "@/assets/tuscany-hero.jpg";
import vineyard from "@/assets/vineyard.jpg";
import villa from "@/assets/villa-interior.jpg";
import { PATREON_URL } from "@/lib/links";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sweet Sin of Tuscany — A Romantic Visual Novel" },
      { name: "description", content: "While taking a deserved week off in the Tuscan hills, an unexpected visitor turns your world upside down. A story of forbidden love and family secrets." },
      { property: "og:title", content: "Sweet Sin of Tuscany" },
      { property: "og:description", content: "A romantic visual novel of forbidden love and family secrets in the Tuscan hills." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-24">
        <img
          src={hero}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-vignette" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background" />
        <Embers />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-up">
          <p className="font-display tracking-[0.4em] uppercase text-xs sm:text-sm text-rose-glow/80 mb-8">
            Vows &amp; Vices Studio Presents
          </p>
          <img
            src={logo}
            alt="Sweet Sin of Tuscany"
            width={1280}
            height={720}
            className="mx-auto w-full max-w-3xl drop-shadow-[0_0_60px_rgba(180,30,50,0.4)]"
          />
          <p className="mt-10 font-serif-italic text-xl sm:text-2xl text-rose-glow/90 text-balance max-w-2xl mx-auto">
            A story of long lost, forbidden love — and the consequences of years of forced separation.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/story"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-display tracking-[0.2em] uppercase text-sm text-foreground bg-romance rounded-sm shadow-[0_0_60px_oklch(0.52_0.20_18/0.35)] hover:shadow-[0_0_80px_oklch(0.52_0.20_18/0.6)] transition-all duration-500 border border-crimson/40"
            >
              <span>Enter the Story</span>
              <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/world"
              className="inline-flex items-center justify-center px-8 py-4 font-display tracking-[0.2em] uppercase text-sm text-rose-glow border border-rose-glow/30 hover:border-rose-glow/70 hover:bg-rose-glow/5 transition-all duration-500 rounded-sm"
            >
              Explore the World
            </Link>
            <a
              href={PATREON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 font-display tracking-[0.2em] uppercase text-sm text-rose-glow border border-crimson/40 hover:border-crimson hover:bg-romance/40 transition-all duration-500 rounded-sm"
            >
              Support on Patreon
            </a>
          </div>

          <p className="mt-16 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Coming Soon · Mature Romance · 18+
          </p>
        </div>
      </section>

      {/* PROLOGUE */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="ornament-divider mb-10 text-xs tracking-[0.4em] uppercase">Prologue</div>
          <h2 className="font-display text-4xl sm:text-6xl text-balance text-rose-glow mb-12 glow-text">
            One week. One villa. <span className="font-serif-italic text-crimson">One unforgivable visitor.</span>
          </h2>
          <div className="space-y-7 text-lg sm:text-xl leading-relaxed text-foreground/80 font-serif">
            <p>
              While taking a deserved week off in the Tuscan hills, an unexpected visitor turns your world upside down.
            </p>
            <p>
              What follows is a story of long lost, forbidden love — and the consequences of years of forced separation.
            </p>
            <p>
              Due to these events, your family's web of lies, that holds a dark secret, will unravel.
            </p>
          </div>
        </div>
      </section>

      {/* CHOICES */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="ornament-divider mb-12 text-xs tracking-[0.4em] uppercase">Your Choices</div>
          <div className="grid gap-px bg-border/40 md:grid-cols-3 rounded-sm overflow-hidden">
            {[
              {
                q: "Reconnect, or remain?",
                a: "Will you reconnect with people you once loved, or will you remain in the past mistakes…",
                img: vineyard,
              },
              {
                q: "Defend, or burn it all?",
                a: "Will you defend your family's legacy, or will you let it all burn…",
                img: villa,
              },
              {
                q: "Old life, or sweet sin?",
                a: "Will you go back to your old life, or will you taste the Sweet Sin of Tuscany?",
                img: hero,
              },
            ].map((c, i) => (
              <article
                key={i}
                className="relative group bg-card p-10 min-h-[28rem] flex flex-col justify-end overflow-hidden"
              >
                <img
                  src={c.img}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-[0.3em] text-crimson mb-4">Chapter {i + 1}</p>
                  <h3 className="font-display text-3xl text-rose-glow mb-4 text-balance">{c.q}</h3>
                  <p className="font-serif-italic text-foreground/80 text-balance">{c.a}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CALL */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-ember opacity-50" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-display text-5xl sm:text-7xl text-balance glow-text">
            Will you taste the
            <span className="block font-serif-italic text-crimson mt-2">Sweet Sin of Tuscany?</span>
          </h2>
          <p className="mt-10 text-muted-foreground max-w-xl mx-auto">
            Be the first to know when the villa opens its doors. Wishlist updates and chapter previews from Vows &amp; Vices Studio.
          </p>
          <Link
            to="/studio"
            className="mt-10 inline-flex items-center px-10 py-4 font-display tracking-[0.25em] uppercase text-sm bg-romance border border-crimson/40 hover:shadow-[0_0_80px_oklch(0.52_0.20_18/0.6)] transition-all duration-500 rounded-sm"
          >
            Meet the Studio
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
