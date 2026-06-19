import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/goto/$")({
  component: GotoRedirectPage,
});

function GotoRedirectPage() {
  const { _splat } = Route.useParams();

  useEffect(() => {
    const path = _splat ?? "";
    const query = window.location.search;
    const target = `https://patreon.com/${path}${query}`;

    const timer = setTimeout(() => {
      window.location.href = target;
    }, 1500);

    return () => clearTimeout(timer);
  }, [_splat]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-muted opacity-30" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-crimson animate-spin" />
        </div>
        <p className="text-lg font-display text-foreground tracking-tight">
          Redirecting you to our Patreon...
        </p>
      </div>
    </div>
  );
}
