import { useEffect, useState } from "react";

const RELEASE_DATE = new Date("2026-09-01T00:00:00");

function formatUnit(value: number, label: string) {
  return (
    <div className="flex flex-col items-center min-w-[2.5rem]">
      <span className="font-display text-xl sm:text-2xl text-rose-glow leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
        {label}
      </span>
    </div>
  );
}

export function EpisodeCountdown() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const diff = Math.max(0, RELEASE_DATE.getTime() - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return (
    <div className="fixed right-3 sm:right-6 top-20 sm:top-24 z-40 max-w-[12rem] rounded-sm border border-crimson/40 bg-background/80 backdrop-blur-md px-3 py-2 shadow-[0_0_30px_oklch(0.52_0.20_18/0.25)]">
      <p className="font-display text-[10px] sm:text-xs uppercase tracking-[0.15em] text-rose-glow/80 text-center mb-2">
        Episode 2 Release
      </p>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {formatUnit(days, "Days")}
        {formatUnit(hours, "Hrs")}
        {formatUnit(minutes, "Min")}
        {formatUnit(seconds, "Sec")}
      </div>
    </div>
  );
}
