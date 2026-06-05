import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import villa from "@/assets/villa-interior.jpg";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "The Story - Sweet Sin of Tuscany" },
      {
        name: "description",
        content:
          "Forbidden love, a family's web of lies, and a secret that won't stay buried. Discover the story of Sweet Sin of Tuscany.",
      },
      { property: "og:title", content: "The Story — Sweet Sin of Tuscany" },
      {
        property: "og:description",
        content: "Forbidden love, a family's web of lies, and a secret that won't stay buried.",
      },
      { property: "og:url", content: "https://vowsandvicesstudio.com/story" },
    ],
    links: [{ rel: "canonical", href: "https://vowsandvicesstudio.com/story" }],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="relative pt-40 pb-20 px-6">
        <img
          src={villa}
          alt=""
          width={1024}
          height={1024}
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-glow/70">Chapter I — Arrival</p>
          <h1 className="font-display text-5xl sm:text-7xl text-rose-glow mt-6 glow-text">The Story</h1>
        </div>
      </section>

      <section className="px-6 pb-24">
        <article className="max-w-3xl mx-auto space-y-10 text-lg sm:text-xl font-serif leading-relaxed text-foreground/85">
          <p className="font-serif-italic text-2xl text-rose-glow text-center text-balance">
            "While enjoying a well-deserved week off in the Tuscan paradise, an unexpected visitor turns your world
            upside down."
          </p>

          <div className="ornament-divider text-xs tracking-[0.3em] uppercase">A Visitor</div>
          <p>
            You came here to escape the city, your hectic job, and the echoes of past wars. The villa is always silent.
            The hills were supposed to be yours. This is your sanctuary. For one week.
          </p>
          <p>Then they walked through the door, and seven days became a heroic journey of resilience.</p>

          <div className="ornament-divider text-xs tracking-[0.3em] uppercase">A Forbidden Love</div>
          <p>
            What follows is a story of long-lost, forbidden love and the consequences of years of forced separation. A
            love kept buried beneath social stigma, family obligations, and the careful architecture of lies your family
            built around you.
          </p>

          <div className="ornament-divider text-xs tracking-[0.3em] uppercase">A Web of Lies</div>
          <p>
            Due to these events, your family’s web of lies, the one that holds a dark secret at its center, will unravel
            thread by thread. Every unanswered question. Every awkward silence at the dinner table. Every story that
            never quite adds up.
          </p>

          <div className="ornament-divider text-xs tracking-[0.3em] uppercase">Your Choices</div>
          <ul className="space-y-6 not-prose">
            {[
              <>Will you reconnect with the people you love, or will you remain trapped in past mistakes?</>,
              <>Will you defend your family’s legacy, or will you let it all burn?</>,
              <>Will you go back to your old existence, or will you taste the…{" "}<span className="font-serif-italic text-crimson">Sweet Sin of Tuscany?</span></>,
            ].map((q, i) => (
              <li key={i} className="border-l-2 border-crimson pl-6 font-serif-italic text-rose-glow/90 text-xl">
                {q}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <SiteFooter />
    </div>
  );
}
