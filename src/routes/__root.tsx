import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { AgeGate } from "@/components/AgeGate";


import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sweet Sin of Tuscany — A 18+ Visual Novel by Vows & Vices" },
      { name: "description", content: "A story of forbidden love, family secrets, and consequences in the Tuscan hills. From Vows & Vices Studio." },
      { name: "author", content: "Vows & Vices Studio" },
      { name: "google-site-verification", content: "4AKRtAjT0F-XOCyKnSqCatEywR0TrF0rYQ4c6UPU-Bk" },
      { property: "og:title", content: "Sweet Sin of Tuscany — A 18+ Visual Novel by Vows & Vices" },
      { property: "og:description", content: "A story of forbidden love, family secrets, and consequences in the Tuscan hills. From Vows & Vices Studio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sweet Sin of Tuscany — A 18+ Visual Novel by Vows & Vices" },
      { name: "twitter:description", content: "A story of forbidden love, family secrets, and consequences in the Tuscan hills. From Vows & Vices Studio." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/fau8yhC67SYgCEotzDd8RwGoHYj2/social-images/social-1777651915234-Main_cover.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/fau8yhC67SYgCEotzDd8RwGoHYj2/social-images/social-1777651915234-Main_cover.webp" },
    ],
    links: [
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JR23CT9FXS"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JR23CT9FXS', { send_page_view: false });
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { href } = useLocation();

  useEffect(() => {
    window.gtag?.("event", "page_view", {
      send_to: "G-JR23CT9FXS",
      page_location: window.location.href,
      page_path: href,
      page_title: document.title,
    });
  }, [href]);

  return (
    <>
      <Outlet />
      <Toaster />
      <AgeGate />
    </>
  );
}

