import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@supabase/supabase-js'
import * as React from 'react'
import { render } from '@react-email/components'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'Vows & Vices'
const SENDER_DOMAIN = 'notify.vowsandvicesstudio.com'
const FROM_DOMAIN = 'vowsandvicesstudio.com'

const bodySchema = z.object({
  email: z.string().trim().email().max(255),
  source: z.string().max(64).optional(),
})

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const Route = createFileRoute('/api/public/newsletter-subscribe')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        let parsed
        try {
          parsed = bodySchema.parse(await request.json())
        } catch {
          return Response.json({ error: 'Invalid email' }, { status: 400 })
        }

        const supabase: any = createClient(supabaseUrl, supabaseServiceKey)
        const email = parsed.email.toLowerCase()
        const source = parsed.source ?? 'studio_page'

        // 1. Insert subscriber (ignore duplicates gracefully)
        const { error: insertError } = await supabase
          .from('newsletter_subscribers')
          .insert({ email, source })

        const isDuplicate = insertError?.code === '23505'
        if (insertError && !isDuplicate) {
          console.error('Failed to insert subscriber', { error: insertError })
          return Response.json({ error: 'Failed to subscribe' }, { status: 500 })
        }

        // Don't re-send welcome to existing subscribers
        if (isDuplicate) {
          return Response.json({ success: true, alreadySubscribed: true })
        }

        // 2. Check suppression
        const { data: suppressed } = await supabase
          .from('suppressed_emails').select('id').eq('email', email).maybeSingle()
        if (suppressed) {
          return Response.json({ success: true, suppressed: true })
        }

        // 3. Render welcome template and enqueue
        const template = TEMPLATES['newsletter-welcome']
        if (!template) {
          return Response.json({ success: true })
        }
        const messageId = crypto.randomUUID()

        // Get-or-create unsubscribe token
        let unsubscribeToken: string
        const { data: existing } = await supabase
          .from('email_unsubscribe_tokens').select('token, used_at').eq('email', email).maybeSingle()
        if (existing && !existing.used_at) {
          unsubscribeToken = existing.token
        } else {
          unsubscribeToken = generateToken()
          await supabase.from('email_unsubscribe_tokens').upsert(
            { token: unsubscribeToken, email },
            { onConflict: 'email', ignoreDuplicates: true },
          )
          const { data: stored } = await supabase
            .from('email_unsubscribe_tokens').select('token').eq('email', email).maybeSingle()
          if (stored) unsubscribeToken = stored.token
        }

        const unsubscribeUrl = `https://${FROM_DOMAIN}/email/unsubscribe?token=${unsubscribeToken}`
        const element = React.createElement(template.component, { unsubscribeUrl })
        const html = await render(element)
        const text = await render(element, { plainText: true })
        const subject = typeof template.subject === 'function' ? template.subject({}) : template.subject

        await supabase.from('email_send_log').insert({
          message_id: messageId,
          template_name: 'newsletter-welcome',
          recipient_email: email,
          status: 'pending',
        })

        const { error: enqueueError } = await supabase.rpc('enqueue_email', {
          queue_name: 'transactional_emails',
          payload: {
            message_id: messageId,
            to: email,
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject,
            html,
            text,
            purpose: 'transactional',
            label: 'newsletter-welcome',
            idempotency_key: `newsletter-welcome-${email}`,
            unsubscribe_token: unsubscribeToken,
            queued_at: new Date().toISOString(),
          },
        })

        if (enqueueError) {
          console.error('Failed to enqueue welcome email', { error: enqueueError })
          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: 'newsletter-welcome',
            recipient_email: email,
            status: 'failed',
            error_message: 'Failed to enqueue',
          })
          // Subscription still succeeded
          return Response.json({ success: true, emailQueued: false })
        }

        return Response.json({ success: true, emailQueued: true })
      },
    },
  },
})
