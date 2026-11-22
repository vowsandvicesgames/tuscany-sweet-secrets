import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ITCH_URL, PATREON_URL, DISCORD_URL } from "@/lib/links";
import { trackItchClick, trackPatreonClick, trackDiscordClick } from "@/lib/analytics";
import cover from "@/assets/cover-moon.webp";

const URL = "https://vowsandvicesstudio.com/episode-2";
const TITLE = "Episode 2 — Coming Soon | Sweet Sin of Tuscany";
const DESC =
  "Episode 2 of Sweet Sin of Tuscany is coming soon. New secrets, new choices, and the story continues. Get a sneak peek and be the first to know.";

const RELEASE_DATE = new Date("2026-09-01T00:00:00Z");

export const Route = createFileRoute("/episode-2")({
  component: Page,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
});

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, RELEASE_DATE.getTime() - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

const highlights = [
  { t: "The story continues", d: "The web of lies tightens. Choices from Episode 1 echo through new scenes and new consequences." },
  { t: "Deeper relationships", d: "More time with Sofia, Mia, Gloria, Bianca, Emily and Paola — and new turns in every romance." },
  { t: "New secrets revealed", d: "The family's dark secret starts to unravel. Nothing at the villa is what it seemed." },
];

function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown();
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return (
      <p className="font-serif-italic text-2xl text-rose-glow/90">The wait is almost over…</p>
    );
  }
  const cells = [
    [days, "days"],
    [hours, "hours"],
    [minutes, "minutes"],
    [seconds, "seconds"],
  ] as const;
  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {cells.map(([value, label]) => (
        <div key={label} className="w-16 sm:w-20 border border-crimson/40 bg-card/60 rounded-sm py-3">
          <div className="font-display text-2xl sm:text-3xl text-rose-glow tabular-nums">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
        </div>
      ))}
    </div>
  );
}

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />

      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 text-center">
        <img
          src={cover}
          alt="Sweet Sin of Tuscany under a Tuscan moon"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="relative max-w-3xl mx-auto">
          <p className="font-display tracking-[0.4em] uppercase text-xs text-rose-glow/80 mb-4">Coming Soon</p>
          <h1 className="font-display text-5xl sm:text-7xl text-rose-glow glow-text text-balance">
            Episode <span className="font-serif-italic text-crimson">Two</span>
          </h1>
          <p className="mt-6 font-serif text-lg sm:text-xl text-foreground/80 text-balance">
            One week was never going to be enough. The story of forbidden love and family secrets continues — deeper,
            darker, and shaped by the choices you already made.
          </p>
          <div className="mt-10">
            <Countdown />
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="ornament-divider mb-10 text-xs tracking-[0.4em] uppercase">What to expect</div>
        <div className="grid gap-5 sm:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.t} className="border border-crimson/30 bg-card p-6 rounded-sm">
              <h2 className="font-display text-xl text-rose-glow mb-2">{h.t}</h2>
              <p className="font-serif text-foreground/80">{h.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SNEAK PEEK — real Episode 2 images go here once provided */}
      <section className="px-6 py-16 max-w-3xl mx-auto text-center">
        <div className="ornament-divider mb-4 text-xs tracking-[0.4em] uppercase">Sneak peek</div>
        <p className="font-serif-italic text-lg text-foreground/80">
          Some things are better left veiled… for now. First previews are coming — and patrons see them before anyone
          else.
        </p>
        <p className="mt-4 text-sm text-muted-foreground font-serif-italic">
          <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackPatreonClick("/episode-2")} className="text-crimson underline">
            Join on Patreon
          </a>{" "}
          for the first unblurred previews.
        </p>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-24 text-center">
        <div className="absolute inset-0 bg-ember opacity-50" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl glow-text text-balance">
            Be there when the <span className="font-serif-italic text-crimson">story continues</span>
          </h2>
          <p className="mt-4 font-serif text-foreground/80">
            Haven't played yet? Episode 1 is free — catch up before the story continues.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={ITCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackItchClick("/episode-2")}
              className="inline-flex items-center justify-center px-8 py-4 font-display tracking-[0.2em] uppercase text-sm text-foreground bg-romance rounded-sm border border-crimson/40 shadow-[0_0_60px_oklch(0.52_0.20_18/0.35)] hover:shadow-[0_0_80px_oklch(0.52_0.20_18/0.6)] transition-all duration-500"
            >
              Play Episode 1 Free
            </a>
            <a
              href={PATREON_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackPatreonClick("/episode-2")}
              className="inline-flex items-center px-6 py-4 font-display tracking-[0.2em] uppercase text-sm text-rose-glow border border-crimson/40 hover:bg-romance/40 transition-all rounded-sm"
            >
              Sneak peeks on Patreon
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDiscordClick("/episode-2")}
              className="inline-flex items-center px-6 py-4 font-display tracking-[0.2em] uppercase text-sm text-foreground bg-discord hover:bg-discord-hover rounded-sm transition-colors"
            >
              Join the Discord
            </a>
          </div>
          <p className="mt-8 text-sm text-muted-foreground font-serif-italic">
            Follow development in our <Link to="/blog" className="text-crimson underline">dev logs</Link>.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
