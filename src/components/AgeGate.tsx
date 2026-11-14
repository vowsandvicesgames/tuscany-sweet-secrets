import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";

const STORAGE_KEY = "vv-age-verified";

export function AgeGate() {
  const { pathname } = useLocation();
  const bypass = pathname === "/email/unsubscribe";
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const verified = localStorage.getItem(STORAGE_KEY) === "true";
      if (!verified) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = open && !bypass ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mounted, bypass]);

  if (bypass || !mounted || !open) return null;

  const confirm = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setOpen(false);
  };

  const deny = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 px-4 backdrop-blur-md"
    >
      <div className="max-w-md w-full rounded-2xl border border-border bg-card p-8 text-center shadow-2xl">
        <h2
          id="age-gate-title"
          className="font-serif text-3xl text-foreground"
        >
          Mature Content
        </h2>
        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Vows & Vices Studio
        </p>
        <p className="mt-6 text-base text-foreground/90 leading-relaxed">
          This site contains content intended for adult audiences (18+),
          including themes of romance, sexuality, and mature storytelling.
        </p>
        <p className="mt-4 text-base text-foreground/90">
          Are you 18 years of age or older?
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={confirm}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Yes, I'm 18+
          </button>
          <button
            onClick={deny}
            className="inline-flex items-center justify-center rounded-md border border-border bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-muted"
          >
            No, exit
          </button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          By entering, you confirm you are of legal age to view adult content in
          your jurisdiction.
        </p>
      </div>
    </div>
  );
}
