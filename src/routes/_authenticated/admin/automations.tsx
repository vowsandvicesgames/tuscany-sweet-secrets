import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  adminListAutomations,
  adminRunAutomations,
  adminSetAutomationTemplate,
  adminToggleAutomation,
} from "@/lib/automations-admin.functions";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/automations")({
  head: () => ({ meta: [{ title: "Admin · Automations" }, { name: "robots", content: "noindex" }] }),
  component: AdminAutomations,
});

type Rule = {
  id: string;
  name: string;
  trigger_type: string;
  template_name: string;
  enabled: boolean;
};

type Event = {
  id: string;
  full_name: string | null;
  email: string | null;
  event_type: string;
  status: string;
  error: string | null;
  created_at: string;
  processed_at: string | null;
};

const TRIGGER_LABELS: Record<string, string> = {
  new_paid_patron: "New paid patron",
  new_free_patron: "New free member",
  tier_upgrade: "Tier upgrade",
  tier_downgrade: "Tier downgrade",
  patron_cancelled: "Patron cancelled",
};

const TEMPLATES = [
  "patron-welcome-paid",
  "patron-welcome-free",
  "patron-tier-changed",
  "patron-cancelled",
];

function AdminAutomations() {
  const load = useServerFn(adminListAutomations);
  const toggle = useServerFn(adminToggleAutomation);
  const setTemplate = useServerFn(adminSetAutomationTemplate);
  const run = useServerFn(adminRunAutomations);

  const [rules, setRules] = useState<Rule[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  const refresh = async () => {
    try {
      const res = await load();
      setRules(res.rules as Rule[]);
      setEvents(res.events as Event[]);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to load automations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = async (rule: Rule) => {
    setRules((prev) => prev.map((r) => (r.id === rule.id ? { ...r, enabled: !r.enabled } : r)));
    try {
      await toggle({ data: { id: rule.id, enabled: !rule.enabled } });
    } catch (e: any) {
      toast.error(e?.message ?? "Could not update rule");
      refresh();
    }
  };

  const handleTemplate = async (rule: Rule, templateName: string) => {
    setRules((prev) => prev.map((r) => (r.id === rule.id ? { ...r, template_name: templateName } : r)));
    try {
      await setTemplate({ data: { id: rule.id, templateName } });
    } catch (e: any) {
      toast.error(e?.message ?? "Could not update template");
      refresh();
    }
  };

  const handleRun = async () => {
    setRunning(true);
    try {
      const res = await run();
      toast.success(`Sent ${res.sent} · skipped ${res.skipped} · failed ${res.failed}`);
      await refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Run failed");
    } finally {
      setRunning(false);
    }
  };

  const pending = events.filter((e) => e.status === "pending").length;

  return (
    <Shell>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl text-rose-glow">Automations</h1>
          <p className="text-sm text-foreground/60 mt-1">
            Patron events trigger these emails automatically · {pending} waiting to send
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/patrons" className="text-sm text-foreground/60 hover:text-rose-glow self-center">
            Patrons
          </Link>
          <button
            onClick={handleRun}
            disabled={running}
            className="px-4 py-2 font-display tracking-[0.2em] uppercase text-xs bg-romance border border-crimson/40 rounded-sm hover:shadow-[0_0_30px_oklch(0.52_0.20_18/0.5)] transition-all disabled:opacity-50"
          >
            {running ? "Running…" : "Run now"}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-foreground/70">Loading…</p>
      ) : (
        <>
          <div className="space-y-3 mb-12">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="border border-crimson/30 rounded-sm bg-card/60 backdrop-blur p-4 flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={() => handleToggle(rule)}
                  aria-label={rule.enabled ? "Disable rule" : "Enable rule"}
                  className={`w-11 h-6 rounded-full border transition-colors relative shrink-0 ${
                    rule.enabled ? "bg-romance border-crimson" : "bg-transparent border-crimson/30"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-rose-glow transition-all ${
                      rule.enabled ? "left-6" : "left-0.5 opacity-50"
                    }`}
                  />
                </button>
                <div className="min-w-[200px] flex-1">
                  <p className="text-rose-glow">{rule.name}</p>
                  <p className="text-[11px] uppercase tracking-widest text-foreground/50">
                    When: {TRIGGER_LABELS[rule.trigger_type] ?? rule.trigger_type}
                  </p>
                </div>
                <select
                  value={rule.template_name}
                  onChange={(e) => handleTemplate(rule, e.target.value)}
                  className="bg-background border border-crimson/30 rounded-sm px-3 py-2 text-sm text-foreground/80"
                >
                  {TEMPLATES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <h2 className="font-display text-xl text-rose-glow mb-4">Recent activity</h2>
          {events.length === 0 ? (
            <p className="text-foreground/60">
              No patron events yet. They appear here after the next Patreon sync detects a change.
            </p>
          ) : (
            <div className="overflow-x-auto border border-crimson/30 rounded-sm bg-card/60 backdrop-blur">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-widest text-foreground/50 border-b border-crimson/20">
                    <th className="p-3">When</th>
                    <th className="p-3">Member</th>
                    <th className="p-3">Event</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-crimson/10">
                  {events.map((ev) => (
                    <tr key={ev.id}>
                      <td className="p-3 text-foreground/60 whitespace-nowrap">
                        {new Date(ev.created_at).toLocaleDateString("en-US")}
                      </td>
                      <td className="p-3 text-rose-glow">{ev.full_name ?? ev.email ?? "—"}</td>
                      <td className="p-3 text-foreground/70">
                        {TRIGGER_LABELS[ev.event_type] ?? ev.event_type}
                      </td>
                      <td className="p-3 text-foreground/60">
                        {ev.status}
                        {ev.error ? ` · ${ev.error}` : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
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
