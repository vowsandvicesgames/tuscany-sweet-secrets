import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminListPatrons, adminSyncPatrons } from "@/lib/patrons-admin.functions";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/patrons")({
  head: () => ({ meta: [{ title: "Admin · Patrons" }, { name: "robots", content: "noindex" }] }),
  component: AdminPatrons,
});

type Patron = {
  id: string;
  email: string | null;
  full_name: string | null;
  patron_status: string | null;
  last_charge_status: string | null;
  currently_entitled_amount_cents: number;
  lifetime_support_cents: number;
  tier_names: string[];
  pledge_relationship_start: string | null;
  last_synced_at: string;
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "active_patron", label: "Active" },
  { key: "declined_patron", label: "Declined" },
  { key: "former_patron", label: "Former" },
  { key: "follower", label: "Free followers" },
] as const;

function AdminPatrons() {
  const list = useServerFn(adminListPatrons);
  const sync = useServerFn(adminSyncPatrons);
  const [patrons, setPatrons] = useState<Patron[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const load = async () => {
    try {
      const res = await list();
      setPatrons(res.patrons as Patron[]);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to load patrons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return patrons;
    if (filter === "follower") return patrons.filter((p) => !p.patron_status);
    return patrons.filter((p) => p.patron_status === filter);
  }, [patrons, filter]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await sync();
      toast.success(`Synced ${res.synced} member(s) from Patreon`);
      await load();
    } catch (e: any) {
      toast.error(e?.message ?? "Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const exportCsv = () => {
    const header = ["email", "full_name", "status", "tiers", "pledge_cents", "lifetime_cents", "joined"];
    const lines = filtered
      .filter((p) => p.email)
      .map((p) =>
        [
          p.email ?? "",
          p.full_name ?? "",
          p.patron_status ?? "follower",
          (p.tier_names ?? []).join(" | "),
          String(p.currently_entitled_amount_cents),
          String(p.lifetime_support_cents),
          p.pledge_relationship_start ?? "",
        ]
          .map((v) => `"${v.replace(/"/g, '""')}"`)
          .join(","),
      );
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `patrons-${filter}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const withEmail = filtered.filter((p) => p.email).length;

  return (
    <Shell>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl text-rose-glow">Patrons</h1>
          <p className="text-sm text-foreground/60 mt-1">
            {patrons.length} members synced · {withEmail} with an email in this view
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/blog" className="text-sm text-foreground/60 hover:text-rose-glow self-center">
            Blog posts
          </Link>
          <button
            onClick={exportCsv}
            disabled={withEmail === 0}
            className="px-4 py-2 font-display tracking-[0.2em] uppercase text-xs border border-crimson/40 rounded-sm hover:text-rose-glow disabled:opacity-40"
          >
            Export CSV
          </button>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-4 py-2 font-display tracking-[0.2em] uppercase text-xs bg-romance border border-crimson/40 rounded-sm hover:shadow-[0_0_30px_oklch(0.52_0.20_18/0.5)] transition-all disabled:opacity-50"
          >
            {syncing ? "Syncing…" : "Sync from Patreon"}
          </button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-5">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-[11px] uppercase tracking-widest px-3 py-1 rounded-sm border transition-colors ${
              filter === f.key
                ? "border-crimson text-rose-glow bg-romance/40"
                : "border-crimson/25 text-foreground/60 hover:text-rose-glow"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-foreground/70">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-foreground/60">
          No members here yet. Hit “Sync from Patreon” to pull your member list.
        </p>
      ) : (
        <div className="overflow-x-auto border border-crimson/30 rounded-sm bg-card/60 backdrop-blur">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-widest text-foreground/50 border-b border-crimson/20">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Tier</th>
                <th className="p-3 text-right">Lifetime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-crimson/10">
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 text-rose-glow whitespace-nowrap">{p.full_name ?? "—"}</td>
                  <td className="p-3 text-foreground/80">{p.email ?? "—"}</td>
                  <td className="p-3 text-foreground/60 whitespace-nowrap">
                    {p.patron_status ?? "follower"}
                  </td>
                  <td className="p-3 text-foreground/60">{(p.tier_names ?? []).join(", ") || "—"}</td>
                  <td className="p-3 text-right text-foreground/70 whitespace-nowrap">
                    ${(p.lifetime_support_cents / 100).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
