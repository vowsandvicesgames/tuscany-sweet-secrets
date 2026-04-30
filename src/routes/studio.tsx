import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import vvLogo from "@/assets/vows-vices-logo.png";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Vows & Vices Studio" },
      { name: "description", content: "Vows & Vices is an independent studio crafting moody, character-driven romantic visual novels. Creators of Sweet Sin of Tuscany." },
      { property: "og:title", content: "Vows & Vices Studio" },
      { property: "og:description", content: "An independent studio crafting moody, character-driven romantic visual novels." },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative pt-40 pb-20 px-6 text-center">
        <img src={vvLogo} alt="Vows & Vices" width={200} height={200} className="mx-auto w-44 h-44 rounded-full shadow-[0_0_80px_oklch(0.52_0.20_18/0.5)]" />
        <h1 className="font-display text-5xl sm:text-7xl text-rose-glow mt-10 glow-text">Vows &amp; Vices</h1>
        <p className="mt-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">An Independent Visual Novel Studio</p>
      </section>

      <section className="px-6 pb-20 max-w-3xl mx-auto space-y-8 text-lg font-serif leading-relaxed text-foreground/85">
        <p className="font-serif-italic text-2xl text-rose-glow text-center text-balance">
          "We write the stories you swore you'd never tell anyone."
        </p>
        <p>
          Vows &amp; Vices is a small studio devoted to one craft: moody, character-driven romance. Every choice matters. Every silence is loaded. Every scene is built to be read more than once.
        </p>
        <p>
          <span className="text-rose-glow">Sweet Sin of Tuscany</span> is our second chapter — a sun-drenched, dark-hearted novel about the people you can't unlove and the families that won't let you.
        </p>
      </section>

      <section className="px-6 pb-24 max-w-3xl mx-auto">
        <div className="ornament-divider text-xs tracking-[0.3em] uppercase mb-10">Stay Close</div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 bg-card/60 border border-border p-4 rounded-sm backdrop-blur"
        >
          <input
            type="email"
            required
            placeholder="your.email@villa.it"
            className="flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-muted-foreground/60 font-serif text-foreground"
          />
          <button
            type="submit"
            className="px-6 py-3 font-display tracking-[0.2em] uppercase text-sm bg-romance border border-crimson/40 hover:shadow-[0_0_60px_oklch(0.52_0.20_18/0.5)] transition-all rounded-sm"
          >
            Receive Letters
          </button>
        </form>
        <p className="text-xs text-muted-foreground mt-3 text-center">Chapter previews and release news. No spam, only secrets.</p>
      </section>

      <SiteFooter />
    </div>
  );
}
