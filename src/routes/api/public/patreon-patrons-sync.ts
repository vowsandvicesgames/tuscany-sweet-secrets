import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@supabase/supabase-js'

const PATREON_API = 'https://www.patreon.com/api/oauth2/v2'

async function patreonFetch(path: string, token: string) {
  const res = await fetch(`${PATREON_API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    throw new Error(`Patreon API ${res.status}: ${(await res.text()).slice(0, 300)}`)
  }
  return res.json() as Promise<any>
}

export const Route = createFileRoute('/api/public/patreon-patrons-sync')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = process.env['SUPABASE_URL']
        const serviceKey = process.env['SUPABASE_SERVICE_ROLE_KEY']
        const token = process.env['PATREON_ACCESS_TOKEN']
        if (!supabaseUrl || !serviceKey || !token) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        const supabase: any = createClient(supabaseUrl, serviceKey, {
          auth: { persistSession: false },
        })

        // Same shared secret as the blog sync job
        const provided = request.headers.get('x-sync-secret') ?? ''
        const { data: cfg } = await supabase
          .from('patreon_sync_config')
          .select('cron_secret')
          .maybeSingle()
        if (!cfg?.cron_secret || provided !== cfg.cron_secret) {
          return new Response('Unauthorized', { status: 401 })
        }

        try {
          const campaigns = await patreonFetch('/campaigns', token)
          const campaignId = campaigns?.data?.[0]?.id
          if (!campaignId) throw new Error('No Patreon campaign found for this token')

          const memberFields = [
            'email',
            'full_name',
            'patron_status',
            'last_charge_status',
            'last_charge_date',
            'currently_entitled_amount_cents',
            'lifetime_support_cents',
            'pledge_relationship_start',
            'is_follower',
          ].join(',')
          const base =
            `fields%5Bmember%5D=${encodeURIComponent(memberFields)}` +
            `&include=currently_entitled_tiers` +
            `&fields%5Btier%5D=title` +
            `&page%5Bcount%5D=200`

          const rows: any[] = []
          let cursor: string | null = null
          for (let page = 0; page < 100; page++) {
            const qs = cursor ? `${base}&page%5Bcursor%5D=${encodeURIComponent(cursor)}` : base
            const res: any = await patreonFetch(`/campaigns/${campaignId}/members?${qs}`, token)
            const tierTitles = new Map<string, string>()
            for (const inc of res?.included ?? []) {
              if (inc?.type === 'tier' && inc?.attributes?.title) {
                tierTitles.set(inc.id, inc.attributes.title)
              }
            }
            for (const m of res?.data ?? []) {
              const a = m.attributes ?? {}
              const tiers: string[] = (m.relationships?.currently_entitled_tiers?.data ?? [])
                .map((t: any) => tierTitles.get(t.id))
                .filter(Boolean)
              rows.push({
                patreon_member_id: m.id,
                patreon_user_id: m.relationships?.user?.data?.id ?? null,
                email: a.email ?? null,
                full_name: a.full_name ?? null,
                patron_status: a.patron_status ?? null,
                last_charge_status: a.last_charge_status ?? null,
                last_charge_date: a.last_charge_date ?? null,
                currently_entitled_amount_cents: a.currently_entitled_amount_cents ?? 0,
                lifetime_support_cents: a.lifetime_support_cents ?? 0,
                tier_names: tiers,
                pledge_relationship_start: a.pledge_relationship_start ?? null,
                is_follower: a.is_follower ?? false,
                last_synced_at: new Date().toISOString(),
              })
            }
            cursor = res?.meta?.pagination?.cursors?.next ?? null
            if (!cursor) break
          }

          // Upsert in chunks so a large campaign doesn't blow the request size
          let saved = 0
          for (let i = 0; i < rows.length; i += 200) {
            const chunk = rows.slice(i, i + 200)
            const { error } = await supabase
              .from('patreon_patrons')
              .upsert(chunk, { onConflict: 'patreon_member_id' })
            if (error) throw new Error(error.message)
            saved += chunk.length
          }

          return Response.json({ success: true, synced: saved })
        } catch (e: any) {
          const message = e?.message ?? 'Unknown error'
          console.error('patreon-patrons-sync failed', message)
          return Response.json({ error: 'Sync failed' }, { status: 500 })
        }
      },
    },
  },
})
