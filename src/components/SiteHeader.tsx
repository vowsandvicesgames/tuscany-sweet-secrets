import { Link } from "@tanstack/react-router";
import vvLogo from "@/assets/vows-vices-logo.png";
import { ITCH_URL, PATREON_URL } from "@/lib/links";
import { trackPatreonClick } from "@/lib/analytics";

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-1 sm:gap-2">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <img src={vvLogo} alt="Vows & Vices Studio" width={40} height={40} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="font-display text-sm tracking-[0.25em] uppercase text-rose-glow hidden md:inline">Vows &amp; Vices</span>
        </Link>
        <nav className="flex items-center gap-0 sm:gap-2 text-sm">
          {[
            { to: "/", label: "Home" },
            { to: "/story", label: "Story" },
            { to: "/world", label: "Games" },
            { to: "/blog", label: "Blog" },
            { to: "/studio", label: "Studio" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-rose-glow" }}
              className="px-1.5 sm:px-3 py-2 font-display tracking-[0.15em] sm:tracking-widest uppercase text-[10px] sm:text-xs text-foreground/70 hover:text-rose-glow transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={ITCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 sm:ml-3 px-2 sm:px-4 py-1.5 sm:py-2 font-display tracking-[0.15em] sm:tracking-widest uppercase text-[10px] sm:text-xs text-foreground bg-romance border border-crimson/40 rounded-sm hover:shadow-[0_0_30px_oklch(0.52_0.20_18/0.5)] transition-all"
          >
            Play Free
          </a>
          <a
            href={PATREON_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackPatreonClick(window.location.pathname)}
            className="ml-1 sm:ml-3 px-2 sm:px-4 py-1.5 sm:py-2 font-display tracking-[0.15em] sm:tracking-widest uppercase text-[10px] sm:text-xs text-rose-glow border border-crimson/40 rounded-sm hover:bg-romance hover:shadow-[0_0_30px_oklch(0.52_0.20_18/0.5)] transition-all"
          >
            Patreon
          </a>
        </nav>
      </div>
    </header>
  );
}
