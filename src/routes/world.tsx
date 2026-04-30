import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import vineyard from "@/assets/vineyard.jpg";
import villa from "@/assets/villa-interior.jpg";
import hero from "@/assets/tuscany-hero.jpg";

export const Route = createFileRoute("/world")({
  head: () => ({
    meta: [
      { title: "The World — Sweet Sin of Tuscany" },
      { name: "description", content: "Step into the villa, the vineyard, and the hills where a forbidden romance unfolds. The world of Sweet Sin of Tuscany." },
      { property: "og:title", content: "The World — Sweet Sin of Tuscany" },
      { property: "og:description", content: "The villa, the vineyard, and the hills where forbidden romance unfolds." },
    ],
  }),
  component: WorldPage,
});

const places = [
  {
    name: "The Villa Bellini",
    tag: "Sanctuary · Stage · Cage",
    body: "Eight bedrooms. Three centuries of secrets. Every portrait on the wall watches you make your choice.",
    img: villa,
  },
  {
    name: "The Old Vineyard",
    tag: "Where you first kissed",
    body: "The rows of vines remember what no one in the family will admit. At dusk the candles still burn between the trellises.",
    img: vineyard,
  },
  {
    name: "The Hills at Twilight",
    tag: "Nowhere to run",
    body: "Cypress trees and a road that only goes two ways: back to the villa, or back to the life you left behind.",
    img: hero,
  },
];

function WorldPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="relative pt-40 pb-16 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-rose-glow/70">Locations</p>
        <h1 className="font-display text-5xl sm:text-7xl text-rose-glow mt-6 glow-text">The World</h1>
        <p className="mt-6 max-w-2xl mx-auto font-serif-italic text-rose-glow/80 text-lg">
          Three places. Three temptations. One unbearable summer.
        </p>
      </section>

      <section className="px-6 pb-24 max-w-6xl mx-auto space-y-16">
        {places.map((p, i) => (
          <article
            key={p.name}
            className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] border border-border [direction:ltr]">
              <img src={p.img} alt={p.name} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/70 via-transparent to-transparent" />
            </div>
            <div className="[direction:ltr]">
              <p className="text-xs uppercase tracking-[0.3em] text-crimson mb-3">{p.tag}</p>
              <h2 className="font-display text-4xl text-rose-glow mb-5">{p.name}</h2>
              <p className="text-lg font-serif text-foreground/80 leading-relaxed">{p.body}</p>
            </div>
          </article>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
