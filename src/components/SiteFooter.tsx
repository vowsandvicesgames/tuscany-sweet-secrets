import { Link } from "@tanstack/react-router";
import vvLogo from "@/assets/vows-vices-logo.png";
import { PATREON_URL } from "@/lib/links";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-ink/60 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-3">
        <div className="flex items-center gap-4">
          <img src={vvLogo} alt="" width={56} height={56} className="rounded-full" />
          <div>
            <div className="font-display text-lg text-rose-glow tracking-wider">Vows &amp; Vices</div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Independent Studio</div>
          </div>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link to="/story" className="hover:text-rose-glow transition-colors">The Story</Link>
          <Link to="/world" className="hover:text-rose-glow transition-colors">The Games</Link>
          <Link to="/studio" className="hover:text-rose-glow transition-colors">The Studio</Link>
          <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" className="hover:text-rose-glow transition-colors">Support on Patreon ↗</a>
          <a href="https://x.com/VowsandVice" target="_blank" rel="noopener noreferrer" className="hover:text-rose-glow transition-colors">X / Twitter ↗</a>
        </nav>
        <div className="text-sm text-muted-foreground">
          <p className="font-serif-italic text-rose-glow/80 mb-2">"Will you taste the Sweet Sin of Tuscany?"</p>
          <p>© {new Date().getFullYear()} Vows &amp; Vices Studio. All rights reserved.</p>
          <p className="text-xs mt-1">Mature audiences. 18+</p>
        </div>
      </div>
    </footer>
  );
}
