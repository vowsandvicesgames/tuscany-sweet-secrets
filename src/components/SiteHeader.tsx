import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import vvLogo from "@/assets/vows-vices-logo.webp";
import { ITCH_URL, PATREON_URL } from "@/lib/links";
import { trackPatreonClick } from "@/lib/analytics";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/story", label: "Story" },
  { to: "/world", label: "Games" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/studio", label: "Studio" },
] as const;

export function SiteHeader({ showEp2Bar = false }: { showEp2Bar?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-1 sm:gap-2">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0" onClick={() => setOpen(false)}>
          <img src={vvLogo} alt="Vows & Vices Studio" width={40} height={40} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="font-display text-sm tracking-[0.25em] uppercase text-rose-glow hidden md:inline">Vows &amp; Vices</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0 sm:gap-2 text-sm">
          {NAV_LINKS.map((l) => (
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
            className="ml-1 sm:ml-3 px-2 sm:px-4 py-1.5 sm:py-2 font-display tracking-[0.15em] sm:tracking-widest uppercase text-[10px] sm:text-xs text-rose-glow border border-crimson/40 rounded-sm hover:bg-romance hover:shadow-[0_0_30px_oklch(0.52_0.20_18/0.5)] transition-all"
          >
            Play Free
          </a>
          <a
            href={PATREON_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackPatreonClick(window.location.pathname)}
            className="ml-1 sm:ml-3 px-2 sm:px-4 py-1.5 sm:py-2 font-display tracking-[0.15em] sm:tracking-widest uppercase text-[10px] sm:text-xs text-foreground bg-romance border border-crimson/40 rounded-sm hover:shadow-[0_0_30px_oklch(0.52_0.20_18/0.5)] transition-all"
          >
            Patreon
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 text-rose-glow border border-crimson/40 rounded-sm hover:bg-romance/40 transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-rose-glow" }}
              onClick={() => setOpen(false)}
              className="px-2 py-3 font-display tracking-[0.2em] uppercase text-sm text-foreground/80 hover:text-rose-glow transition-colors border-b border-border/20"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-4">
            <a
              href={ITCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-3 font-display tracking-[0.2em] uppercase text-xs text-rose-glow border border-crimson/40 rounded-sm hover:bg-romance transition-all"
            >
              Play Free
            </a>
            <a
              href={PATREON_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackPatreonClick(window.location.pathname)}
              className="flex-1 text-center px-4 py-3 font-display tracking-[0.2em] uppercase text-xs text-foreground bg-romance border border-crimson/40 rounded-sm hover:shadow-[0_0_30px_oklch(0.52_0.20_18/0.5)] transition-all"
            >
              Patreon
            </a>
          </div>
        </nav>
      )}

      {showEp2Bar && (
        <Link
          to="/episode-2"
          className="block text-center py-2.5 px-4 font-display tracking-[0.25em] uppercase text-xs text-rose-glow bg-romance/40 hover:bg-romance/60 hover:text-foreground transition-colors"
        >
          Episode 2 — Coming in December · See the preview →
        </Link>
      )}
    </header>
  );
}
