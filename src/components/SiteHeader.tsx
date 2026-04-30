import { Link } from "@tanstack/react-router";
import vvLogo from "@/assets/vows-vices-logo.png";

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={vvLogo} alt="Vows & Vices Studio" width={40} height={40} className="rounded-full opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="font-display text-sm tracking-[0.25em] uppercase text-rose-glow hidden sm:inline">Vows &amp; Vices</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 text-sm">
          {[
            { to: "/", label: "Home" },
            { to: "/story", label: "Story" },
            { to: "/world", label: "World" },
            { to: "/studio", label: "Studio" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-rose-glow" }}
              className="px-3 py-2 font-display tracking-widest uppercase text-xs text-foreground/70 hover:text-rose-glow transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
