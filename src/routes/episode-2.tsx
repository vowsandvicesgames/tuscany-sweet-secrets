import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ITCH_URL, PATREON_URL, DISCORD_URL } from "@/lib/links";
import { trackItchClick, trackPatreonClick, trackDiscordClick } from "@/lib/analytics";
import heroAsset from "@/assets/ep2-hero.webp.asset.json";
import galleryImage1 from "@/assets/ep2-gallery-1.webp.asset.json";
import galleryImage2 from "@/assets/ep2-gallery-2.webp.asset.json";

export const galleryImages: { src: string; alt: string; width: number; height: number }[] = [
  { src: galleryImage1.url, alt: "Episode 2 preview", width: 820, height: 461 },
  { src: galleryImage2.url, alt: "Episode 2 preview", width: 820, height: 461 },
];

const URL = "https://vowsandvicesstudio.com/episode-2";
const HERO_URL = new globalThis.URL(heroAsset.url, URL).href;
const TITLE = "Episode 2 — Coming in December | Sweet Sin of Tuscany";
const DESC =
  "Episode 2 of Sweet Sin of Tuscany is coming in December. 11 new scenes, 1,000+ new renders and 8 animations. Follow the progress and be the first to know.";
const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" }).max(255);

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
      { property: "og:image", content: HERO_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: HERO_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />
      <main>
        <section className="relative pt-40 pb-20 px-6 text-center">
          <img
            src={heroAsset.url}
            alt="Episode 2 gladiator preview — Sweet Sin of Tuscany"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={820}
            height={461}
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          <div className="relative max-w-3xl mx-auto">
            <p className="font-display uppercase text-xs text-rose-glow/80 mb-4">Coming in December</p>
            <p className="font-serif text-sm text-foreground/80 mb-5">Sweet Sin of Tuscany</p>
            <h1 className="font-display text-5xl sm:text-7xl text-rose-glow glow-text text-balance tracking-normal">
              Episode <span className="font-serif-italic text-crimson">Two</span>
            </h1>
          </div>
        </section>

        <section className="px-6 pt-6 pb-12 max-w-3xl mx-auto text-center" aria-label="Episode 2 story">
          <p className="font-serif text-lg sm:text-xl leading-relaxed text-foreground/80">
            Episode 2 picks up right where Episode 1 left off. The villa's quiet days are gone, and every woman under its roof has her own reasons to stay close to you. From a lesson that ends with bruised pride, to a day in town that nobody will forget, to the first preparations for the Carnival, each choice pulls you deeper into the family's web.
          </p>
        </section>

        <section className="px-6 py-12 max-w-6xl mx-auto" aria-labelledby="awaits-title">
          <h2 id="awaits-title" className="ornament-divider mb-10 font-display text-lg sm:text-xl tracking-normal">What awaits you</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-crimson/30 bg-card p-6 rounded-sm">
              <p className="font-serif text-lg text-rose-glow leading-relaxed">11 new scenes, written in full and now being polished</p>
            </div>
            <div className="border border-crimson/30 bg-card p-6 rounded-sm">
              <p className="font-serif text-lg text-rose-glow leading-relaxed">More than 1,000 new renders and 8 animations</p>
            </div>
            <div className="border border-crimson/30 bg-card p-6 rounded-sm">
              <p className="font-serif text-lg text-rose-glow leading-relaxed">A full day of exploring the Tuscan town together with all the girls</p>
            </div>
            <div className="border border-crimson/30 bg-card p-6 rounded-sm">
              <p className="font-serif text-lg text-rose-glow leading-relaxed">Individual scenes where you choose who you spend time with</p>
            </div>
          </div>
        </section>

        <p className="px-6 pb-12 max-w-3xl mx-auto text-center font-serif-italic text-sm leading-relaxed text-foreground/80">
          Status: The script is 100% finished. The release date will be announced once the test build is ready.
        </p>

        {galleryImages.length > 0 && (
          <section className="px-6 py-12 max-w-6xl mx-auto" aria-labelledby="gallery-title">
            <h2 id="gallery-title" className="ornament-divider mb-10 font-display text-lg sm:text-xl tracking-normal">Sneak peek</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-sm border border-crimson/30"
                />
              ))}
            </div>
          </section>
        )}

        <section className="relative px-6 py-20 text-center" aria-labelledby="signup-title">
          <div className="absolute inset-0 bg-ember opacity-50 pointer-events-none" />
          <div className="relative max-w-3xl mx-auto">
            <h2 id="signup-title" className="font-display text-3xl sm:text-4xl text-rose-glow glow-text text-balance tracking-normal">
              Be the first to know when Episode 2 drops
            </h2>
            <Button asChild className="mt-8 h-auto max-w-full whitespace-normal px-6 py-4 font-display uppercase text-sm text-rose-glow bg-transparent border border-crimson/40 hover:bg-romance rounded-sm">
              <a
                href={`${PATREON_URL}?utm_source=website&utm_medium=web&utm_campaign=ep2`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPatreonClick("/episode-2")}
              >
                Follow Episode 2 on Patreon
              </a>
            </Button>
            <NewsletterForm />
          </div>
        </section>

        <section className="px-6 pt-12 pb-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl text-rose-glow glow-text text-balance tracking-normal">
              Haven't played yet? Episode 1 is free.
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
              <Button asChild className="h-auto whitespace-normal px-8 py-4 font-display uppercase text-sm text-foreground bg-romance rounded-sm border border-crimson/40 hover:bg-romance hover:border-crimson">
                <a href={ITCH_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackItchClick("/episode-2")}>
                  Play Episode 1 Free
                </a>
              </Button>
              <Button asChild className="h-auto whitespace-normal px-6 py-4 font-display uppercase text-sm text-foreground bg-discord hover:bg-discord-hover rounded-sm">
                <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackDiscordClick("/episode-2")}>
                  Join the Discord
                </a>
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground font-serif-italic">
              Follow development in our <Link to="/blog" className="text-crimson underline">dev logs</Link>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/public/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data, source: "episode-2" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error("Something went wrong. Please try again.");
        return;
      }
      if (data.alreadySubscribed) {
        toast.success("You're already on the list.");
      } else {
        window.gtag?.("event", "newsletter_signup", {
          send_to: "G-JR23CT9FXS",
          method: "website_form",
          form_location: "episode-2",
        });
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
    <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3 bg-background/40 border border-border p-3 rounded-sm max-w-xl mx-auto" aria-label="Episode 2 newsletter signup">
      <Input
        type="email"
        required
        aria-label="Email address"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={loading}
        placeholder="your.email@villa.it"
        className="flex-1 min-w-0 h-auto px-4 py-3 border-0 rounded-sm shadow-none font-serif text-foreground disabled:opacity-50"
      />
      <Button type="submit" disabled={loading} className="h-auto px-6 py-3 font-display uppercase text-sm text-foreground bg-romance border border-crimson/40 hover:bg-romance hover:border-crimson rounded-sm disabled:cursor-not-allowed">
        {loading ? "Sending…" : "Receive Letters"}
      </Button>
    </form>
  );
}
