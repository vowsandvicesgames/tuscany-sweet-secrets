import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import vvLogo from "@/assets/vows-vices-logo.png";
import { PATREON_URL } from "@/lib/links";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Vows & Vices Studio" },
      {
        name: "description",
        content:
          "Vows & Vices is an independent studio crafting moody, character-driven romantic 18+ visual novels. Creators of Sweet Sin of Tuscany.",
      },
      { property: "og:title", content: "Vows & Vices Studio" },
      {
        property: "og:description",
        content: "An independent studio crafting moody, character-driven romantic visual novels.",
      },
    ],
  }),
  component: StudioPage,
});

const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" }).max(255);

function StudioPage() {
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
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data, source: "studio_page" });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast.success("You're already on the list — secrets coming soon.");
        setEmail("");
        return;
      }
      toast.error("Something went wrong. Please try again.");
      return;
    }
    toast.success("Welcome to the villa. Watch your inbox.");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative pt-40 pb-20 px-6 text-center">
        <img
          src={vvLogo}
          alt="Vows & Vices"
          width={200}
          height={200}
          className="mx-auto w-44 h-44 rounded-full shadow-[0_0_80px_oklch(0.52_0.20_18/0.5)]"
        />
        <h1 className="font-display text-5xl sm:text-7xl text-rose-glow mt-10 glow-text">Vows &amp; Vices</h1>
        <p className="mt-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          An Independent Visual Novel Studio
        </p>
      </section>

      <section className="px-6 pb-20 max-w-3xl mx-auto space-y-8 text-lg font-serif leading-relaxed text-foreground/85">
        <p className="font-serif-italic text-2xl text-rose-glow text-center text-balance">
          "We write the stories you swore you'd never tell anyone."
        </p>
        <p>
          Vows &amp; Vices is a small studio devoted to one craft: moody, character-driven 18+ romance. Every choice
          matters. Every silence is loaded. Every scene is built to be read more than once.
        </p>
        <p>
          <span className="text-rose-glow">Sweet Sin of Tuscany</span> is our first 18+ romantic visual novel about the
          people you can't unlove and the families that won't let you.
        </p>
      </section>

      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <div className="ornament-divider text-xs tracking-[0.3em] uppercase mb-10">Become a Patron</div>
        <div className="relative overflow-hidden rounded-sm border border-crimson/40 bg-card/60 p-8 sm:p-10 text-center backdrop-blur">
          <div className="absolute inset-0 bg-ember opacity-40 pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl text-rose-glow glow-text">
              Step behind the velvet curtain.
            </h2>
            <p className="mt-4 font-serif text-foreground/80 max-w-xl mx-auto">
              Patrons receive early chapter previews, character sketches, behind-the-scenes notes, and a vote on what
              happens next at the Sweet sin of Tuscany.
            </p>
            <a
              href={PATREON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center px-10 py-4 font-display tracking-[0.25em] uppercase text-sm bg-romance border border-crimson/40 hover:shadow-[0_0_60px_oklch(0.52_0.20_18/0.6)] transition-all rounded-sm"
            >
              Join us on Patreon ↗
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 max-w-3xl mx-auto">
        <div className="ornament-divider text-xs tracking-[0.3em] uppercase mb-10">Stay Close</div>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 bg-card/60 border border-border p-4 rounded-sm backdrop-blur"
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
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Chapter previews and release news. No spam, only secrets.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
