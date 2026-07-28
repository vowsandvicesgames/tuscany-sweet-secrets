import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Embers } from "@/components/Embers";
import { listPublishedPosts } from "@/lib/blog.functions";
import logo from "@/assets/sweet-sin-logo.png";
import gloria from "@/assets/character-gloria-home.webp";
import cover from "@/assets/cover-moon.webp";
import emili from "@/assets/character-emily-home.webp";
import sofia from "@/assets/character-sofia-home.webp";

import { PATREON_URL, DISCORD_URL, REDDIT_URL } from "@/lib/links";

import { toast } from "sonner";
import { z } from "zod";



const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" }).max(255);

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
};


export const Route = createFileRoute("/")({
  loader: () => listPublishedPosts(),
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
  const { posts } = Route.useLoaderData() as { posts: BlogPost[] };
  const latestLogs = posts.slice(0, 5);


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

      {/* DISCORD CTA */}
      <section className="relative px-6 mt-4 mb-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-display tracking-[0.2em] uppercase text-xs sm:text-sm text-foreground bg-discord hover:bg-discord-hover rounded-sm transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.583 18.583 0 0 0-5.487 0 13.392 13.392 0 0 0-.617-1.249.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Join the Discord
          </a>
          <a
            href={REDDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-display tracking-[0.2em] uppercase text-xs sm:text-sm text-foreground bg-reddit hover:bg-reddit-hover rounded-sm transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.63 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.753-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l6.907 1.486a.75.75 0 0 0 .154-1.482l-2.614-.56a.75.75 0 0 0-.316 1.466l.521.112a1.75 1.75 0 0 1 .369 3.444zM8 14.041c-.917 0-1.69.802-1.69 1.79 0 .988.773 1.79 1.69 1.79.917 0 1.69-.802 1.69-1.79 0-.988-.773-1.79-1.69-1.79zm7.441.001c-.916 0-1.688.8-1.688 1.788 0 .988.772 1.789 1.688 1.789s1.688-.801 1.688-1.789c0-.988-.772-1.788-1.688-1.788z" />
            </svg>
            Join Reddit
          </a>
        </div>
      </section>


      {/* DEV LOGS */}

      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="ornament-divider mb-10 text-xs tracking-[0.4em] uppercase">Dev Logs</div>

          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {latestLogs.map((log) => (
              <Link
                key={log.id}
                to="/blog/$slug"
                params={{ slug: log.slug }}
                className="group relative overflow-hidden rounded-sm border border-crimson/30 bg-card hover:border-crimson transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={log.cover_image_url ?? ""}
                    alt={log.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 text-center">
                  <h2 className="font-display text-sm sm:text-base text-rose-glow tracking-wider">
                    {log.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 font-display tracking-[0.25em] uppercase text-xs sm:text-sm text-rose-glow border border-crimson/40 hover:border-crimson hover:bg-romance/40 transition-all duration-500 rounded-sm"
            >
              Visit the Blog<span className="ml-3">→</span>
            </Link>
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
