import { Link } from "@tanstack/react-router";
import vvLogo from "@/assets/vows-vices-logo.png";
import { PATREON_URL } from "@/lib/links";

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img src={vvLogo} alt="Vows & Vices Studio" width={40} height={40} className="rounded-full opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="font-display text-sm tracking-[0.25em] uppercase text-rose-glow hidden sm:inline">Vows &amp; Vices</span>
        </Link>
        <nav className="flex items-center gap-0.5 sm:gap-2 text-sm">
          {[
            { to: "/", label: "Home" },
            { to: "/story", label: "Story" },
            { to: "/world", label: "Games" },
            { to: "/studio", label: "Studio" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-rose-glow" }}
              className="px-2 sm:px-3 py-2 font-display tracking-widest uppercase text-xs text-foreground/70 hover:text-rose-glow transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={PATREON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 sm:ml-3 px-3 sm:px-4 py-2 font-display tracking-widest uppercase text-xs text-rose-glow border border-crimson/40 rounded-sm hover:bg-romance hover:shadow-[0_0_30px_oklch(0.52_0.20_18/0.5)] transition-all"
          >
            Patreon
          </a>
        </nav>
      </div>
    </header>
  );
}
