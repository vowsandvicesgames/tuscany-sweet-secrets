import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@supabase/supabase-js'

const PATREON_API = 'https://www.patreon.com/api/oauth2/v2'

type PatreonPost = {
  id: string
  attributes: {
    title?: string | null
    content?: string | null
    url?: string | null
    published_at?: string | null
    is_public?: boolean | null
  }
}

function slugify(title: string, id: string) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
    .replace(/^-|-$/g, '')
  return base || `patreon-${id}`
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

async function patreonFetch(path: string, token: string) {
  const res = await fetch(`${PATREON_API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    throw new Error(`Patreon API ${res.status}: ${(await res.text()).slice(0, 300)}`)
  }
  return res.json() as Promise<any>
}

export const Route = createFileRoute('/api/public/patreon-sync')({
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

        // --- auth: only the scheduled job (or an admin with the secret) may run this
        const provided = request.headers.get('x-sync-secret') ?? ''
        const { data: cfg } = await supabase
          .from('patreon_sync_config')
          .select('cron_secret')
          .maybeSingle()
        if (!cfg?.cron_secret || provided !== cfg.cron_secret) {
          return new Response('Unauthorized', { status: 401 })
        }

        try {
          // 1. Resolve the campaign
          const campaigns = await patreonFetch('/campaigns', token)
          const campaignId = campaigns?.data?.[0]?.id
          if (!campaignId) throw new Error('No Patreon campaign found for this token')

          // 2. Fetch recent posts
          const fields =
            'fields%5Bpost%5D=title,content,url,published_at,is_public&page%5Bcount%5D=20'
          const postsRes = await patreonFetch(`/campaigns/${campaignId}/posts?${fields}`, token)
          const posts: PatreonPost[] = postsRes?.data ?? []

          const publicPosts = posts.filter(
            (p) => p.attributes?.is_public && p.attributes?.published_at && p.attributes?.title,
          )

          // 3. Skip anything already imported
          const ids = publicPosts.map((p) => p.id)
          const existing = ids.length
            ? (await supabase.from('blog_posts').select('patreon_post_id').in('patreon_post_id', ids))
                .data ?? []
            : []
          const seen = new Set(existing.map((r: any) => r.patreon_post_id))

          const created: string[] = []
          for (const p of publicPosts) {
            if (seen.has(p.id)) continue
            const title = (p.attributes.title ?? '').trim()
            const patreonUrl = p.attributes.url ?? 'https://www.patreon.com/VowsandVicesStudio'
            const rawContent = p.attributes.content ?? ''
            const plain = stripHtml(rawContent)
            const excerpt = plain ? plain.slice(0, 300) : null

            const bodyHtml = `${rawContent}
<p>Read the full update <a href="${patreonUrl}" target="_blank" rel="noopener" style="color:oklch(0.52 0.20 18);text-decoration:underline"><strong>HERE</strong></a>.</p>`

            let slug = slugify(title, p.id)
            const { data: clash } = await supabase
              .from('blog_posts')
              .select('id')
              .eq('slug', slug)
              .maybeSingle()
            if (clash) slug = `${slug}-${p.id}`.slice(0, 100)

            const { error } = await supabase.from('blog_posts').insert({
              slug,
              title,
              excerpt,
              body: bodyHtml,
              published: true,
              published_at: p.attributes.published_at,
              patreon_post_id: p.id,
            })
            if (error) {
              console.error('patreon-sync insert failed', { id: p.id, error })
              continue
            }
            created.push(slug)
          }

          await supabase
            .from('patreon_sync_config')
            .update({
              last_run_at: new Date().toISOString(),
              last_result: `ok: ${created.length} new post(s)`,
            })
            .eq('id', true)

          return Response.json({ success: true, imported: created })
        } catch (e: any) {
          const message = e?.message ?? 'Unknown error'
          console.error('patreon-sync failed', message)
          await supabase
            .from('patreon_sync_config')
            .update({ last_run_at: new Date().toISOString(), last_result: `error: ${message}` })
            .eq('id', true)
          return Response.json({ error: 'Sync failed' }, { status: 500 })
        }
      },
    },
  },
})
