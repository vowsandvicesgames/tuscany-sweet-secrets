import { createClient } from '@supabase/supabase-js'
import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import logo from '@/assets/vows-vices-logo.webp'

function redactEmail(email: string | null | undefined): string {
  if (!email) return '***'
  const [localPart, domain] = email.split('@')
  if (!localPart || !domain) return '***'
  return `${localPart[0]}***@${domain}`
}

type UnsubscribeStatus = 'missing' | 'invalid' | 'already_unsubscribed' | 'valid'
type UnsubscribeData = { status: UnsubscribeStatus; token?: string }

const lookupUnsubscribeToken = createServerFn({ method: 'GET' })
  .inputValidator((input: { token?: string }) => ({
    token: typeof input.token === 'string' ? input.token : undefined,
  }))
  .handler(async ({ data }): Promise<UnsubscribeData> => {
    if (!data.token) return { status: 'missing' }

    // A token authorizes only this narrow lookup; never return the email.
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
    const { data: tokenRecord, error } = await supabaseAdmin
      .from('email_unsubscribe_tokens')
      .select('used_at')
      .eq('token', data.token)
      .maybeSingle()

    if (error || !tokenRecord) return { status: 'invalid' }
    if (tokenRecord.used_at) return { status: 'already_unsubscribed' }
    return { status: 'valid', token: data.token }
  })

export const Route = createFileRoute("/email/unsubscribe")({
  validateSearch: (search: Record<string, unknown>): { token?: string } => ({
    token: typeof search.token === 'string' ? search.token : undefined,
  }),
  loaderDeps: ({ search }) => ({ token: search.token }),
  loader: ({ deps }) => lookupUnsubscribeToken({ data: deps }),
  head: () => ({
    meta: [
      { title: 'Unsubscribe — Vows & Vices Studio' },
      { name: 'description', content: 'Manage your Vows & Vices newsletter subscription.' },
      { property: 'og:title', content: 'Unsubscribe — Vows & Vices Studio' },
      { property: 'og:description', content: 'Manage your Vows & Vices newsletter subscription.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'robots', content: 'noindex, nofollow' },
      { name: 'referrer', content: 'no-referrer' },
    ],
  }),
  component: UnsubscribePage,
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        // Extract token from query params (always present for RFC 8058 one-click)
        const url = new URL(request.url)
        let token: string | null = url.searchParams.get('token')

        // Detect RFC 8058 one-click unsubscribe: POST with form-encoded body
        // containing "List-Unsubscribe=One-Click". Email clients (Gmail, Apple Mail,
        // etc.) send this when the user clicks "Unsubscribe" in the mail UI.
        const contentType = request.headers.get('content-type') ?? ''
        if (contentType.includes('application/x-www-form-urlencoded')) {
          const formText = await request.text()
          const params = new URLSearchParams(formText)
          // For one-click, token comes from query param (already set above).
          // Otherwise, token may be in the form body.
          if (!params.get('List-Unsubscribe')) {
            const formToken = params.get('token')
            if (formToken) {
              token = formToken
            }
          }
        } else {
          // JSON body (from the app's unsubscribe page)
          try {
            const body = await request.json()
            if (body.token) {
              token = body.token
            }
          } catch {
            // Fall through — token stays from query param
          }
        }

        if (!token) {
          return Response.json({ error: 'Token is required' }, { status: 400 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Look up the token
        const { data: tokenRecord, error: lookupError } = await supabase
          .from('email_unsubscribe_tokens')
          .select('*')
          .eq('token', token)
          .maybeSingle()

        if (lookupError || !tokenRecord) {
          return Response.json({ error: 'Invalid or expired token' }, { status: 404 })
        }

        if (tokenRecord.used_at) {
          return Response.json({ success: false, reason: 'already_unsubscribed' })
        }

        // Atomic check-and-update to avoid TOCTOU race
        const { data: updated, error: updateError } = await supabase
          .from('email_unsubscribe_tokens')
          .update({ used_at: new Date().toISOString() })
          .eq('token', token)
          .is('used_at', null)
          .select()
          .maybeSingle()

        if (updateError) {
          console.error('Failed to mark token as used', { error: updateError, token })
          return Response.json({ error: 'Failed to process unsubscribe' }, { status: 500 })
        }

        if (!updated) {
          return Response.json({ success: false, reason: 'already_unsubscribed' })
        }

        // Add email to suppressed list (upsert to handle duplicates)
        const { error: suppressError } = await supabase
          .from('suppressed_emails')
          .upsert(
            { email: tokenRecord.email.toLowerCase(), reason: 'unsubscribe' },
            { onConflict: 'email' },
          )

        if (suppressError) {
          console.error('Failed to suppress email', {
            error: suppressError,
            email_redacted: redactEmail(tokenRecord.email),
          })
          return Response.json({ error: 'Failed to process unsubscribe' }, { status: 500 })
        }

        console.log('Email unsubscribed', {
          email_redacted: redactEmail(tokenRecord.email),
        })

        return Response.json({ success: true })
      },
    },
  },
})


function UnsubscribePage() {
  const data = Route.useLoaderData()
  // Remount when navigating between different unsubscribe links.
  return <UnsubscribeConfirmation key={`${data.status}:${data.token ?? ''}`} data={data} />
}

function UnsubscribeConfirmation({ data }: { data: UnsubscribeData }) {
  const [result, setResult] = useState<'success' | 'already_unsubscribed' | 'invalid' | 'error' | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const canConfirm = data.status === 'valid' && (!result || result === 'error')

  async function confirmUnsubscribe() {
    if (!data.token || submitting) return
    setSubmitting(true)
    try {
      const response = await fetch(`/email/unsubscribe?token=${encodeURIComponent(data.token)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: data.token }),
      })
      const body = await response.json()
      if (body.reason === 'already_unsubscribed') setResult('already_unsubscribed')
      else if (response.ok && body.success === true) setResult('success')
      else if (response.status === 400 || response.status === 404) setResult('invalid')
      else setResult('error')
    } catch {
      setResult('error')
    } finally {
      setSubmitting(false)
    }
  }

  let message = "You're about to leave the Vows & Vices newsletter. Confirm below to stop receiving newsletter emails."
  if (result === 'success') message = "You've been unsubscribed."
  else if (result === 'already_unsubscribed' || data.status === 'already_unsubscribed') message = "You've already been unsubscribed."
  else if (result === 'invalid' || data.status === 'missing' || data.status === 'invalid') message = 'This unsubscribe link is invalid or has expired.'
  else if (result === 'error') message = 'Something went wrong. Please try again.'

  return (
    <main className="min-h-screen bg-background px-6 py-16 flex items-center justify-center">
      <div className="w-full max-w-lg text-center">
        <img src={logo} alt="Vows & Vices Studio" className="mx-auto mb-10 h-28 w-48 object-contain" />
        <h1 className="font-display text-4xl text-rose-glow">Newsletter unsubscribe</h1>
        <p role="status" aria-live="polite" className="mt-6 font-serif text-xl leading-relaxed text-muted-foreground">{message}</p>
        {canConfirm && (
          <Button
            onClick={confirmUnsubscribe}
            disabled={submitting}
            aria-busy={submitting}
            size="lg"
            className="mt-8 rounded-sm bg-romance border border-crimson/40 font-display text-lg text-foreground"
          >
            Confirm unsubscribe
          </Button>
        )}
        <div className="mt-8">
          <Link to="/" className="font-serif text-muted-foreground underline underline-offset-4 hover:text-rose-glow">Back to home</Link>
        </div>
      </div>
    </main>
  )
}
