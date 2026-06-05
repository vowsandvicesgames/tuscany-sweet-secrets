import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Embers } from "@/components/Embers";
import logo from "@/assets/sweet-sin-logo.png";
import gloria from "@/assets/character-gloria-home.webp";
import cover from "@/assets/cover-moon.webp";
import emili from "@/assets/character-emily-home.webp";
import sofia from "@/assets/character-sofia-home.webp";
import devlog01 from "@/assets/devlogs/devlog-01.png";
import devlog02 from "@/assets/devlogs/devlog-02.webp";
import devlog03 from "@/assets/devlogs/devlog-03.webp";
import devlog04 from "@/assets/devlogs/devlog-04.webp";
import devlog05 from "@/assets/devlogs/devlog-05.png";

const devLogs = [
  { title: "Dev Log No. 05", img: devlog05, url: "https://www.patreon.com/posts/welcome-to-our-160246516" },
  { title: "Dev Log No. 04", img: devlog04, url: "https://www.patreon.com/posts/welcome-to-our-159557997" },
  { title: "Dev Log No. 03", img: devlog03, url: "https://www.patreon.com/posts/welcome-to-our-158978955" },
  { title: "Dev Log No. 02", img: devlog02, url: "https://www.patreon.com/posts/welcome-to-our-158371002" },
  { title: "Dev Log No. 01", img: devlog01, url: "https://www.patreon.com/posts/welcome-to-our-157774143" },
];
import { PATREON_URL } from "@/lib/links";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" }).max(255);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sweet Sin of Tuscany — A Romantic 18+ Visual Novel" },
      {
        name: "description",
        content:
          "While taking a deserved week off in the Tuscan hills, an unexpected visitor turns your world upside down. A story of forbidden love and family secrets.",
      },
      { property: "og:title", content: "Sweet Sin of Tuscany — A Romantic 18+ Visual Novel" },
      {
        property: "og:description",
        content: "A romantic 18+ visual novel of forbidden love and family secrets in the Tuscan hills.",
      },
      { property: "og:url", content: "https://vowsandvicesstudio.com/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vowsandvicesstudio.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: "Sweet Sin of Tuscany",
          applicationCategory: "Game",
          genre: ["Visual Novel", "Romance"],
          contentRating: "Mature 18+",
          description:
            "A romantic 18+ visual novel of forbidden love, family secrets, and consequences set in the Tuscan hills.",
          publisher: {
            "@type": "Organization",
            name: "Vows & Vices Studio",
            url: "https://vowsandvicesstudio.com/",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[600px] sm:min-h-[calc(73px+42.8125vw)] flex flex-col pt-[73px] pb-12 overflow-hidden">
        <img
          src={cover}
          alt="Sweet Sin of Tuscany, cast under a Tuscan moon"
          width={1920}
          height={900}
          className="absolute inset-0 sm:top-[73px] sm:inset-x-0 sm:bottom-auto w-full h-full sm:h-auto object-cover sm:object-contain object-top opacity-95"
        />
        <div className="absolute inset-0 sm:top-[73px] sm:h-[42.8125vw] bg-gradient-to-t from-background via-background/60 sm:via-background/30 to-background/40 sm:to-transparent" />
        <div className="absolute inset-0 sm:top-[73px] sm:h-[42.8125vw] bg-vignette" />
        <Embers />

        <div className="relative z-10 mt-auto w-full max-w-7xl mx-auto px-6 animate-fade-up">
          <div className="text-left max-w-4xl">
            <p className="font-display tracking-[0.4em] uppercase text-xs sm:text-sm text-rose-glow/80 mb-4">
              Vows &amp; Vices Studio Proudly Presents
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-rose-glow glow-text text-balance">
              <span className="font-serif-italic text-crimson">Sweet Sin</span> of Tuscany
            </h1>
            <p className="mt-5 font-serif-italic text-lg sm:text-xl text-rose-glow/90 text-balance">
              A story of long lost, forbidden love and the consequences of years of forced separation.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-start gap-3">
              <Link
                to="/story"
                className="inline-flex items-center justify-center px-6 py-3 font-display tracking-[0.2em] uppercase text-xs sm:text-sm text-rose-glow border border-crimson/40 hover:border-crimson hover:bg-romance/40 transition-all duration-500 rounded-sm"
              >
                <span>Enter the Story</span>
                <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/world"
                className="inline-flex items-center justify-center px-6 py-3 font-display tracking-[0.2em] uppercase text-xs sm:text-sm text-rose-glow border border-rose-glow/30 hover:border-rose-glow/70 hover:bg-rose-glow/5 transition-all duration-500 rounded-sm"
              >
                Explore the Game<span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href={PATREON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-6 py-3 font-display tracking-[0.2em] uppercase text-xs sm:text-sm text-foreground bg-romance rounded-sm shadow-[0_0_60px_oklch(0.52_0.20_18/0.35)] hover:shadow-[0_0_80px_oklch(0.52_0.20_18/0.6)] transition-all duration-500 border border-crimson/40"
              >
                Support us on Patreon
              </a>
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Visual Novel * Romance * 18+
            </p>
          </div>
        </div>
      </section>

      {/* ITCH.IO WIDGET */}
      <section className="relative z-10 w-full flex justify-center px-6 -mt-4 mb-8">
        <iframe
          frameBorder="0"
          src="https://itch.io/embed/4640956?linkback=true"
          width="552"
          height="167"
          title="Sweet Sin of Tuscany by VowsandVices"
        />
      </section>

      {/* DEV LOGS */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="ornament-divider mb-10 text-xs tracking-[0.4em] uppercase">Dev Logs</div>
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {devLogs.map((log) => (
              <a
                key={log.url}
                href={log.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-sm border border-crimson/30 bg-card hover:border-crimson transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="ornament-divider mb-10 text-xs tracking-[0.4em] uppercase">Dev Logs</div>
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {devLogs.map((log) => (
              <a
                key={log.url}
                href={log.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-sm border border-crimson/30 bg-card hover:border-crimson transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={log.img}
                    alt={log.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-display text-sm sm:text-base text-rose-glow tracking-wider">
                    {log.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROLOGUE */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="ornament-divider mb-10 text-xs tracking-[0.4em] uppercase">Prologue</div>
          <h2 className="font-display text-4xl sm:text-6xl text-balance text-rose-glow mb-12 glow-text">
            One week. One villa. <span className="font-serif-italic text-crimson">One unforgettable visitor.</span>
          </h2>
          <div className="space-y-7 text-lg sm:text-xl leading-relaxed text-foreground/80 font-serif">
            <p>
              While enjoying a well-deserved week off in the Tuscan paradise, an unexpected visitor turns your world
              upside down.
            </p>
            <p>
              What follows is a story of long lost, forbidden love and the consequences of years of forced separation.
            </p>
            <p>Due to these events, your family’s web of lies will unravel, revealing a dark secret.</p>
          </div>
        </div>
      </section>

      {/* CHOICES */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="ornament-divider mb-12 text-xs tracking-[0.4em] uppercase">Your Choices</div>
          <div className="grid gap-px bg-border/40 grid-cols-1 md:grid-cols-3 rounded-sm overflow-hidden">
            {[
              {
                q: "Love or dominate?",
                img: emili,
              },
              {
                q: "Forgive or punish?",
                img: sofia,
              },
              {
                q: "One or more?",
                img: gloria,
              },
            ].map((c, i) => (
              <article
                key={i}
                className="relative group bg-card p-8 sm:p-10 aspect-[3/4] sm:aspect-auto sm:min-h-[28rem] md:min-h-[32rem] flex flex-col justify-end overflow-hidden"
              >
                <img
                  src={c.img}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-65 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-[0.3em] text-crimson mb-4">Chapter {i + 1}</p>
                  <h3 className="font-display text-2xl sm:text-3xl text-rose-glow mb-4 text-balance">{c.q}</h3>
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

          <div className="mt-12 relative overflow-hidden rounded-sm border border-crimson/40 bg-card/60 p-8 sm:p-10 backdrop-blur text-center">
            <div className="absolute inset-0 bg-ember opacity-40 pointer-events-none" />
            <div className="relative">
              <p className="text-muted-foreground max-w-xl mx-auto">
                Be the first to know when the villa opens its doors. Wishlist updates and chapter previews from Vows
                &amp; Vices Studio.
              </p>

              <Link
                to="/studio"
                className="mt-8 inline-flex items-center px-10 py-4 font-display tracking-[0.25em] uppercase text-sm bg-romance border border-crimson/40 hover:shadow-[0_0_80px_oklch(0.52_0.20_18/0.6)] transition-all duration-500 rounded-sm"
              >
                Meet the Studio
              </Link>

              <div className="ornament-divider text-xs tracking-[0.3em] uppercase my-10">And Join the Letters</div>

              <h3 className="font-display text-2xl sm:text-3xl text-rose-glow glow-text">
                Whispers from the Sweet sin of Tuscany, straight to your inbox.
              </h3>
              <p className="mt-3 font-serif text-foreground/80 max-w-xl mx-auto">
                Subscribe for chapter previews, release news, and announcements. No spam, only secrets.
              </p>

              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/public/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data, source: "home_page" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error("Something went wrong. Please try again.");
        return;
      }
      if (data.alreadySubscribed) {
        toast.success("You're already on the list — secrets coming soon.");
      } else {
        toast.success("Welcome to the villa. Check your inbox.");
      }
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubscribe}
      className="mt-6 flex flex-col sm:flex-row gap-3 bg-background/40 border border-border p-3 rounded-sm max-w-xl mx-auto"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        placeholder="your.email@villa.it"
        className="flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-muted-foreground/60 font-serif text-foreground disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 font-display tracking-[0.2em] uppercase text-sm bg-romance border border-crimson/40 hover:shadow-[0_0_60px_oklch(0.52_0.20_18/0.5)] transition-all rounded-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sending…" : "Receive Letters"}
      </button>
    </form>
  );
}
