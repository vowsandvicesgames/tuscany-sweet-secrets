import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@supabase/supabase-js'

/**
 * Processes pending patron events and sends the matching one-to-one
 * notification email for each. Called by a scheduled job.
 */
export const Route = createFileRoute('/api/public/patron-automations-run')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = process.env['SUPABASE_URL']
        const serviceKey = process.env['SUPABASE_SERVICE_ROLE_KEY']
        if (!supabaseUrl || !serviceKey) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        const supabase: any = createClient(supabaseUrl, serviceKey, {
          auth: { persistSession: false },
        })

        const provided = request.headers.get('x-sync-secret') ?? ''
        const { data: cfg } = await supabase
          .from('patreon_sync_config')
          .select('cron_secret')
          .maybeSingle()
        if (!cfg?.cron_secret || provided !== cfg.cron_secret) {
          return new Response('Unauthorized', { status: 401 })
        }

        const { data: rules } = await supabase
          .from('patron_automations')
          .select('id, trigger_type, template_name, enabled')
          .eq('enabled', true)

        const { data: events } = await supabase
          .from('patron_events')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: true })
          .limit(100)

        const origin = new URL(request.url).origin
        let sent = 0
        let skipped = 0
        let failed = 0

        for (const ev of events ?? []) {
          const rule = (rules ?? []).find((r: any) => r.trigger_type === ev.event_type)
          if (!rule) {
            await supabase
              .from('patron_events')
              .update({ status: 'skipped', error: 'No enabled rule', processed_at: new Date().toISOString() })
              .eq('id', ev.id)
            skipped++
            continue
          }
          if (!ev.email) {
            await supabase
              .from('patron_events')
              .update({ status: 'skipped', error: 'No email address', processed_at: new Date().toISOString(), automation_id: rule.id })
              .eq('id', ev.id)
            skipped++
            continue
          }

          try {
            const res = await fetch(`${origin}/lovable/email/transactional/send`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${serviceKey}`,
              },
              body: JSON.stringify({
                templateName: rule.template_name,
                recipientEmail: ev.email,
                idempotencyKey: `patron-event-${ev.id}`,
                templateData: {
                  name: ev.full_name ?? undefined,
                  ...(ev.details ?? {}),
                },
              }),
            })
            if (!res.ok) throw new Error(`send failed (${res.status})`)
            await supabase
              .from('patron_events')
              .update({ status: 'sent', processed_at: new Date().toISOString(), automation_id: rule.id, error: null })
              .eq('id', ev.id)
            sent++
          } catch (e: any) {
            await supabase
              .from('patron_events')
              .update({
                status: 'failed',
                error: (e?.message ?? 'Unknown error').slice(0, 300),
                processed_at: new Date().toISOString(),
                automation_id: rule.id,
              })
              .eq('id', ev.id)
            failed++
          }
        }

        return Response.json({ success: true, sent, skipped, failed })
      },
    },
  },
})
