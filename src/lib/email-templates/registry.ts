import type { ComponentType } from 'react'
import { template as newsletterWelcome } from './newsletter-welcome'
import { template as patronWelcomePaid } from './patron-welcome-paid'
import { template as patronWelcomeFree } from './patron-welcome-free'
import { template as patronTierChanged } from './patron-tier-changed'
import { template as patronCancelled } from './patron-cancelled'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

/**
 * Template registry — maps template names to their React Email components.
 * Import and register new templates here after creating them in this directory.
 */
export const TEMPLATES: Record<string, TemplateEntry> = {
  'newsletter-welcome': newsletterWelcome,
  'patron-welcome-paid': patronWelcomePaid,
  'patron-welcome-free': patronWelcomeFree,
  'patron-tier-changed': patronTierChanged,
  'patron-cancelled': patronCancelled,
}
