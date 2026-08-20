import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error(error.message);
  if (!data) throw new Response("Forbidden: admin only", { status: 403 });
}

export const adminListPatrons = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("patreon_patrons")
      .select(
        "id, email, full_name, patron_status, last_charge_status, currently_entitled_amount_cents, lifetime_support_cents, tier_names, pledge_relationship_start, last_synced_at",
      )
      .order("pledge_relationship_start", { ascending: false, nullsFirst: false });
    if (error) throw new Error(error.message);
    return { patrons: data ?? [] };
  });

export const adminSyncPatrons = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: cfg } = await supabaseAdmin
      .from("patreon_sync_config")
      .select("cron_secret")
      .maybeSingle();
    if (!cfg?.cron_secret) throw new Error("Sync is not configured");

    const origin = process.env["SITE_URL"] ?? "https://vowsandvicesstudio.com";
    const res = await fetch(`${origin}/api/public/patreon-patrons-sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-sync-secret": cfg.cron_secret },
      body: "{}",
    });
    const json: any = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.error ?? `Sync failed (${res.status})`);
    return { synced: json?.synced ?? 0 };
  });
