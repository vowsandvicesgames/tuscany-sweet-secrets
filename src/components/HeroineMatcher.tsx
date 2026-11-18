import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { recommendHeroine } from "@/lib/matchmaker.functions";
import { characters } from "@/lib/characters";

export function HeroineMatcher() {
  const recommend = useServerFn(recommendHeroine);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ slug: string; reason: string } | null>(null);
  const match = result ? characters.find((c) => c.slug === result.slug) : null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || text.trim().length < 3) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const r: any = await recommend({ data: { text } });
      if (r.error) setError(r.error); else setResult(r);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="text-center font-serif text-3xl text-foreground md:text-4xl">Find your heroine</h2>
      <p className="mt-3 text-center text-muted-foreground">
        Describe the love story you're craving, and our matchmaker will tell you whose heart to chase first.
      </p>
      <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={600}
          rows={4}
          placeholder="e.g. A slow-burn romance with someone forbidden, who is strict in public but tender in private..."
          className="w-full rounded-md border border-border bg-card p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Describe your ideal love story"
        />
        <button
          type="submit"
          disabled={loading || text.trim().length < 3}
          className="self-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Finding your match..." : "Find my match"}
        </button>
      </form>
      {error && <p className="mt-4 text-center text-destructive" role="alert">{error}</p>}
      {match && result && (
        <div className="mt-8 flex flex-col items-center gap-6 rounded-lg border border-border bg-card p-6 md:flex-row">
          <img src={match.img} alt={match.name} className="h-64 w-48 rounded-md object-cover object-top" loading="lazy" />
          <div>
            <p className="text-sm uppercase tracking-widest text-primary">Your match</p>
            <h3 className="mt-1 font-serif text-3xl text-foreground">{match.name}</h3>
            <p className="text-sm text-muted-foreground">{match.role}</p>
            <p className="mt-3 text-foreground">{result.reason}</p>
            <Link to="/characters/$slug" params={{ slug: match.slug }} className="mt-4 inline-block font-semibold text-primary underline-offset-4 hover:underline">
              Read {match.name}'s story →
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
