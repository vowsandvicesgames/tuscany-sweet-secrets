import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ITCH_URL, PATREON_URL, DISCORD_URL } from "@/lib/links";
import { trackItchClick, trackPatreonClick, trackDiscordClick } from "@/lib/analytics";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "About the Game & FAQ — Sweet Sin of Tuscany | Vows & Vices" },
      {
        name: "description",
        content:
          "Everything about Sweet Sin of Tuscany: is it free, which platforms it runs on, what the 18+ visual novel contains, how episodes are released, and how to support development.",
      },
      { property: "og:title", content: "About the Game & FAQ — Sweet Sin of Tuscany" },
      {
        property: "og:description",
        content:
          "Is Sweet Sin of Tuscany free? Which platforms does it run on? What does it contain? Answers to the most common questions about our 18+ visual novel.",
      },
      { property: "og:url", content: "https://vowsandvicesstudio.com/faq" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://vowsandvicesstudio.com/faq" }],
  }),
});

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is Sweet Sin of Tuscany?",
    a: (
      <>
        Sweet Sin of Tuscany is an 18+ visual novel by Vows &amp; Vices Studio — a story of long lost, forbidden love
        and the consequences of years of forced separation, set in a Tuscan villa full of family secrets. You play as
        Luca (you can change the name), and the story revolves around Sofia, Mia, Gloria, Bianca and Emily, with more
        love interests planned later. Choices can lean toward love or dominance, and you may pursue one person or more
        than one. Read more on the{" "}
        <Link to="/story" className="text-crimson underline hover:text-rose-glow transition-colors">
          Story page
        </Link>{" "}
        and meet everyone on the{" "}
        <Link to="/world" className="text-crimson underline hover:text-rose-glow transition-colors">
          Games page
        </Link>
        .
      </>
    ),
  },
  {
    q: "Is the game free?",
    a: (
      <>
        Yes. Episode 1 is completely free to download on{" "}
        <a
          href={ITCH_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackItchClick(window.location.pathname)}
          className="text-crimson underline hover:text-rose-glow transition-colors"
        >
          itch.io
        </a>
        . If you enjoy it and want to support development, you can join us on{" "}
        <a
          href={PATREON_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackPatreonClick(window.location.pathname)}
          className="text-crimson underline hover:text-rose-glow transition-colors"
        >
          Patreon
        </a>{" "}
        — patrons get early builds, uncensored previews and a vote in story polls.
      </>
    ),
  },
  {
    q: "Which platforms does it run on?",
    a: <>The game is available for Windows, macOS, Linux and Android. Download it from our itch.io page.</>,
  },
  {
    q: "What kind of content does the game contain?",
    a: (
      <>
        Sweet Sin of Tuscany is an adult (18+) visual novel with romance, drama and explicit scenes. It deals with
        mature themes like forbidden love and family secrets. It is intended for adults only — that's why the site
        asks you to confirm your age before entering.
      </>
    ),
  },
  {
    q: "How is the game released?",
    a: (
      <>
        The story is released in episodes. Episode 1 is out now and free. We share progress, previews and behind the
        scenes notes in our{" "}
        <Link to="/blog" className="text-crimson underline hover:text-rose-glow transition-colors">
          dev logs
        </Link>
        , and patrons on Patreon get early access to new builds before anyone else.
      </>
    ),
  },
  {
    q: "How can I follow development?",
    a: (
      <>
        The easiest way is the{" "}
        <Link to="/blog" className="text-crimson underline hover:text-rose-glow transition-colors">
          blog
        </Link>
        , where every dev log and work-in-progress update is published. You can also join our{" "}
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackDiscordClick(window.location.pathname)}
          className="text-crimson underline hover:text-rose-glow transition-colors"
        >
          Discord
        </a>{" "}
        community to talk with us and other players directly.
      </>
    ),
  },
  {
    q: "How can I support the studio?",
    a: (
      <>
        The best way is{" "}
        <a
          href={PATREON_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackPatreonClick(window.location.pathname)}
          className="text-crimson underline hover:text-rose-glow transition-colors"
        >
          Patreon
        </a>
        . Your support lets us spend more time making the game, and in return you get early builds, uncensored
        previews, wallpapers and a say in some of the story's choices. Even the free tier helps — you'll get public
        dev logs and free releases.
      </>
    ),
  },
  {
    q: "Who is making the game?",
    a: (
      <>
        Vows &amp; Vices is a small independent studio. You can read more about us on the{" "}
        <Link to="/studio" className="text-crimson underline hover:text-rose-glow transition-colors">
          Studio page
        </Link>
        .
      </>
    ),
  },
];

function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* INTRO */}
      <section className="relative pt-40 pb-16 px-6 text-center">
        <h1 className="font-display text-4xl sm:text-6xl text-rose-glow glow-text text-balance">
          About the Game &amp; FAQ
        </h1>
        <p className="mt-6 max-w-2xl mx-auto font-serif-italic text-rose-glow/80 text-lg">
          Everything you want to know about Sweet Sin of Tuscany — what it is, where to play it, and how to be part
          of its story.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href={ITCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackItchClick(window.location.pathname)}
            className="inline-flex items-center justify-center px-8 py-3 font-display tracking-[0.2em] uppercase text-xs sm:text-sm text-foreground bg-romance rounded-sm shadow-[0_0_60px_oklch(0.52_0.20_18/0.35)] hover:shadow-[0_0_80px_oklch(0.52_0.20_18/0.6)] transition-all duration-500 border border-crimson/40"
          >
            Play Episode 1 Free
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24 max-w-3xl mx-auto">
        <div className="flex flex-col gap-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-sm border border-border/60 bg-card/40 open:border-crimson/40 transition-colors"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 sm:p-6 font-display tracking-[0.1em] uppercase text-sm sm:text-base text-rose-glow hover:text-rose-glow/80 transition-colors [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="shrink-0 text-crimson transition-transform duration-300 group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-6 font-serif text-foreground/85 text-base sm:text-lg leading-relaxed">
                {f.a}
              </div>
            </details>
          ))}
        </div>

        <p className="mt-12 text-center text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Still curious? Ask us on Discord — we answer personally.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
