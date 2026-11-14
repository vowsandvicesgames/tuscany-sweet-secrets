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

function firstImageUrl(html: string): string | null {
  const m = html.match(/<img[^>]+src="([^"]+)"/i)
  if (!m?.[1]) return null
  return m[1].replace(/&amp;/g, '&')
}

/**
 * Patreon image URLs are signed and expire, so copy the image into our own
 * storage bucket and return a permanent public URL.
 */
async function mirrorImage(
  supabase: any,
  sourceUrl: string,
  postId: string,
): Promise<{ coverUrl: string; thumbnailUrl: string | null } | null> {
  try {
    const res = await fetch(sourceUrl)
    if (!res.ok) return null
    const contentType = res.headers.get('content-type') ?? 'image/png'
    const ext = contentType.includes('jpeg') ? 'jpg' : contentType.includes('webp') ? 'webp' : 'png'
    const bytes = new Uint8Array(await res.arrayBuffer())
    const path = `blog/patreon/${postId}.${ext}`
    const { error } = await supabase.storage
      .from('email-assets')
      .upload(path, bytes, { contentType, upsert: true })
    if (error) {
      console.error('patreon-sync image upload failed', error)
      return null
    }
    const coverUrl = supabase.storage.from('email-assets').getPublicUrl(path).data.publicUrl as string
    let thumbnailUrl: string | null = null
    try {
      const { createBlogThumbnail } = await import('@/lib/blog-thumbnail.server')
      const thumbnail = await createBlogThumbnail(bytes)
      const thumbnailPath = `blog/patreon/${postId}-thumb.webp`
      const { error: thumbnailError } = await supabase.storage.from('email-assets')
        .upload(thumbnailPath, thumbnail, { contentType: 'image/webp', upsert: true })
      if (thumbnailError) throw thumbnailError
      thumbnailUrl = supabase.storage.from('email-assets').getPublicUrl(thumbnailPath).data.publicUrl
    } catch (error) {
      console.error('patreon-sync thumbnail failed', error)
    }
    return { coverUrl, thumbnailUrl }
  } catch (e) {
    console.error('patreon-sync image mirror failed', e)
    return null
  }
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
          .select('cron_secret, sync_since')
          .maybeSingle()
        if (!cfg?.cron_secret || provided !== cfg.cron_secret) {
          return new Response('Unauthorized', { status: 401 })
        }

        try {
          // 1. Resolve the campaign
          const campaigns = await patreonFetch('/campaigns', token)
          const campaignId = campaigns?.data?.[0]?.id
          if (!campaignId) throw new Error('No Patreon campaign found for this token')

          // 2. Fetch posts (Patreon returns them oldest-first and paginates,
          // so walk the cursor to the end to reach the newest posts).
          const fields =
            'fields%5Bpost%5D=title,content,url,published_at,is_public&page%5Bcount%5D=50'
          const posts: PatreonPost[] = []
          let cursor: string | null = null
          for (let page = 0; page < 20; page++) {
            const qs = cursor ? `${fields}&page%5Bcursor%5D=${encodeURIComponent(cursor)}` : fields
            const postsRes: any = await patreonFetch(`/campaigns/${campaignId}/posts?${qs}`, token)
            posts.push(...((postsRes?.data ?? []) as PatreonPost[]))
            cursor = postsRes?.meta?.pagination?.cursors?.next ?? null
            if (!cursor) break
          }

          // Only import posts published after the sync watermark, so posts
          // already added by hand are never duplicated.
          const since = cfg.sync_since ? new Date(cfg.sync_since).getTime() : 0
          const publicPosts = posts.filter(
            (p) =>
              p.attributes?.is_public &&
              p.attributes?.published_at &&
              p.attributes?.title &&
              new Date(p.attributes.published_at).getTime() > since,
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

            const patreonImage = firstImageUrl(rawContent)
            const cover = patreonImage ? await mirrorImage(supabase, patreonImage, p.id) : null

            const { error } = await supabase.from('blog_posts').insert({
              slug,
              title,
              excerpt,
              body: bodyHtml,
              cover_image_url: cover?.coverUrl ?? null,
              thumbnail_url: cover?.thumbnailUrl ?? null,
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

          // 4. Backfill covers for previously imported posts that still lack one
          const { data: missingCovers } = await supabase
            .from('blog_posts')
            .select('id, body, patreon_post_id')
            .not('patreon_post_id', 'is', null)
            .is('cover_image_url', null)
          for (const row of missingCovers ?? []) {
            const src = firstImageUrl(row.body ?? '')
            if (!src) continue
            const url = await mirrorImage(supabase, src, row.patreon_post_id)
            if (url) await supabase.from('blog_posts').update({ cover_image_url: url.coverUrl, thumbnail_url: url.thumbnailUrl }).eq('id', row.id)
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
