import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { listSitemapSlugs } from "@/lib/blog.functions";

const BASE_URL = "https://vowsandvicesstudio.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/story", changefreq: "monthly", priority: "0.8" },
          { path: "/world", changefreq: "monthly", priority: "0.8" },
          { path: "/studio", changefreq: "monthly", priority: "0.7" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          
        ];

        try {
          const { posts } = await listSitemapSlugs();
          for (const p of posts) {
            entries.push({
              path: `/blog/${p.slug}`,
              changefreq: "monthly",
              priority: "0.6",
              lastmod: p.published_at ? new Date(p.published_at).toISOString().slice(0, 10) : undefined,
            });
          }
        } catch (e) {
          console.error("[sitemap] failed to load blog posts", e);
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
