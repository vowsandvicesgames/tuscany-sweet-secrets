import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error(error.message);
  if (!data) throw new Response("Forbidden: admin only", { status: 403 });
}

export const adminListAutomations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const [rules, events] = await Promise.all([
      context.supabase
        .from("patron_automations")
        .select("id, name, trigger_type, template_name, enabled")
        .order("trigger_type"),
      context.supabase
        .from("patron_events")
        .select("id, full_name, email, event_type, status, error, created_at, processed_at")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);
    if (rules.error) throw new Error(rules.error.message);
    if (events.error) throw new Error(events.error.message);
    return { rules: rules.data ?? [], events: events.data ?? [] };
  });

export const adminToggleAutomation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; enabled: boolean }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("patron_automations")
      .update({ enabled: data.enabled })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminSetAutomationTemplate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; templateName: string }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("patron_automations")
      .update({ template_name: data.templateName })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminRunAutomations = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: cfg } = await supabaseAdmin
      .from("patreon_sync_config")
      .select("cron_secret")
      .maybeSingle();
    if (!cfg?.cron_secret) throw new Error("Automations are not configured");

    const origin = process.env["SITE_URL"] ?? "https://vowsandvicesstudio.com";
    const res = await fetch(`${origin}/api/public/patron-automations-run`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-sync-secret": cfg.cron_secret },
      body: "{}",
    });
    const json: any = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.error ?? `Run failed (${res.status})`);
    return { sent: json?.sent ?? 0, skipped: json?.skipped ?? 0, failed: json?.failed ?? 0 };
  });
