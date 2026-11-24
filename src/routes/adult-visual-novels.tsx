import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ITCH_URL, PATREON_URL, DISCORD_URL } from "@/lib/links";
import { trackItchClick, trackPatreonClick, trackDiscordClick } from "@/lib/analytics";
import cover from "@/assets/main-wallpaper-ssot-censored.webp.asset.json";
import emily from "@/assets/character-emily-home.webp";
import sofia from "@/assets/character-sofia-home.webp";
import gloria from "@/assets/character-gloria-home.webp";
import shot1 from "@/assets/cover-no1-big-moon.webp";
import shot2 from "@/assets/cover-sofia-swing.webp";
import shot3 from "@/assets/cover-beach-1.webp";

const URL = "https://vowsandvicesstudio.com/adult-visual-novels";
const TITLE = "Free Adult Visual Novel (18+) with Choices — Sweet Sin of Tuscany";
const DESC =
  "Looking for a story-driven 18+ adult visual novel with real choices? Sweet Sin of Tuscany: forbidden love, family secrets, multiple love interests. Episode 1 is free.";

export const Route = createFileRoute("/adult-visual-novels")({
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

const reasons = [
  { t: "Forbidden love & family secrets", d: "One week in a Tuscan villa, an unexpected visitor, and a family web of lies that slowly unravels." },
  { t: "Choices that shape the story", d: "Love or dominate? Forgive or punish? Your decisions change how relationships unfold." },
  { t: "Several love interests", d: "Sofia, Mia, Gloria, Bianca and Emily — pursue one, or more than one." },
  { t: "Released in episodes", d: "Episode 1 is out now and free. New episodes follow, with progress shared in our dev logs." },
];

const chars = [
  { n: "Emily", img: emily, q: "Love or dominate?" },
  { n: "Sofia", img: sofia, q: "Forgive or punish?" },
  { n: "Gloria", img: gloria, q: "One or more?" },
];

const facts = [
  ["Genre", "Adult visual novel, 18+"],
  ["Gameplay", "Story choices, multiple love interests"],
  ["Price", "Episode 1 free"],
  ["Platforms", "Windows, macOS, Linux, Android"],
  ["Language", "English"],
];

function PlayButton() {
  return (
    <a
      href={ITCH_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackItchClick(window.location.pathname)}
      className="inline-flex items-center justify-center px-8 py-4 font-display tracking-[0.2em] uppercase text-sm text-foreground bg-romance rounded-sm border border-crimson/40 shadow-[0_0_60px_oklch(0.52_0.20_18/0.35)] hover:shadow-[0_0_80px_oklch(0.52_0.20_18/0.6)] transition-all duration-500"
    >
      Play Episode 1 Free
    </a>
  );
}

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />

      <section className="relative pt-[125px] sm:pt-[117px] pb-16 text-center">
        <img src={cover.url} alt="Sweet Sin of Tuscany cast under a Tuscan moon" loading="eager" fetchPriority="high" decoding="async" width={1920} height={1080} className="w-full h-auto opacity-95" />
        <div className="relative max-w-3xl mx-auto px-6 mt-10">
          <p className="font-display tracking-[0.4em] uppercase text-xs text-rose-glow/80 mb-4">Adult Visual Novel · 18+</p>
          <h1 className="font-display text-4xl sm:text-6xl text-rose-glow glow-text text-balance">
            Sweet Sin of Tuscany <span className="font-serif-italic text-crimson">— A Free Adult Visual Novel with Choices</span>
          </h1>
          <p className="mt-6 font-serif text-lg sm:text-xl text-foreground/80 text-balance">
            Play Episode 1 free on Windows, macOS, Linux or Android. Sweet Sin of Tuscany is an ongoing 18+ romance visual novel about forbidden love, family secrets and choices that shape your relationships. Follow development and previews of Episode 2.
          </p>
          <div className="mt-8"><PlayButton /></div>
        </div>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="ornament-divider mb-10 text-xs tracking-[0.4em] uppercase">Why you'll love it</div>
        <div className="grid gap-5 sm:grid-cols-2">
          {reasons.map((r) => (
            <div key={r.t} className="border border-crimson/30 bg-card p-6 rounded-sm">
              <h2 className="font-display text-xl text-rose-glow mb-2">{r.t}</h2>
              <p className="font-serif text-foreground/80">{r.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-3xl mx-auto">
        <div className="ornament-divider mb-10 text-xs tracking-[0.4em] uppercase">At a glance</div>
        <dl className="border border-border rounded-sm divide-y divide-border">
          {facts.map(([k, v]) => (
            <div key={k} className="grid grid-cols-3 gap-4 px-5 py-3">
              <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground self-center">{k}</dt>
              <dd className="col-span-2 font-serif text-foreground/90">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="ornament-divider mb-10 text-xs tracking-[0.4em] uppercase">Meet the women</div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
          {chars.map((c) => (
            <Link key={c.n} to="/world" className="group relative block aspect-[3/4] overflow-hidden rounded-sm border border-crimson/30">
              <img src={c.img} alt={c.n} loading="lazy" decoding="async" width={1080} height={1920} className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="font-display text-2xl text-rose-glow">{c.n}</h3>
                <p className="font-serif-italic text-foreground/80">{c.q}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground font-serif-italic">
          Meet everyone on the <Link to="/world" className="text-crimson underline">Games page</Link>.
        </p>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="ornament-divider mb-10 text-xs tracking-[0.4em] uppercase">Screenshots</div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[shot1, shot2, shot3].map((s, i) => (
            <img key={i} src={s} alt={`Sweet Sin of Tuscany screenshot ${i + 1}`} loading="lazy" decoding="async" className="w-full aspect-video object-cover rounded-sm border border-border" />
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-3xl mx-auto font-serif text-foreground/80 space-y-4">
        <div className="ornament-divider mb-10 text-xs tracking-[0.4em] uppercase">Quick answers</div>
        <p><strong className="text-rose-glow">Is it free?</strong> Yes, Episode 1 is free to download on itch.io.</p>
        <p><strong className="text-rose-glow">Which platforms?</strong> Windows, macOS, Linux and Android.</p>
        <p><strong className="text-rose-glow">Is it for adults?</strong> Yes, the game is 18+ only.</p>
        <p>More answers on the <Link to="/faq" className="text-crimson underline">FAQ page</Link>.</p>
      </section>

      <section className="relative px-6 py-24 text-center">
        <div className="absolute inset-0 bg-ember opacity-50" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl glow-text text-balance">
            Will you taste the <span className="font-serif-italic text-crimson">Sweet Sin of Tuscany?</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PlayButton />
            <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackPatreonClick(window.location.pathname)} className="inline-flex items-center px-6 py-4 font-display tracking-[0.2em] uppercase text-sm text-rose-glow border border-crimson/40 hover:bg-romance/40 transition-all rounded-sm">Support on Patreon</a>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackDiscordClick(window.location.pathname)} className="inline-flex items-center px-6 py-4 font-display tracking-[0.2em] uppercase text-sm text-foreground bg-discord hover:bg-discord-hover rounded-sm transition-colors">Join the Discord</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
