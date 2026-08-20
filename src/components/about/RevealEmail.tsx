'use client'

import { useState } from 'react'
import posthog from 'posthog-js'
import { AnalyticsEvent } from '@/constants/analyticsEvents'
import { joinEmail, mailtoHref } from '@/lib/contact/obfuscate'
import { EmailParts } from '@/types'

// TODO(a11y): bg-green-600 with white text on CTAs below WCAG AA — consider green-700/green-800 in light mode
const CTA_CLASSES =
  'inline-flex items-center justify-center px-6 py-3 border border-foreground dark:border-white text-foreground dark:text-white font-jetbrains-mono text-sm rounded-none transition-colors hover:border-green-600 hover:text-green-600 dark:hover:border-ink-accent dark:hover:text-ink-accent'

const IDLE_LABEL = 'Email me directly'

interface Props {
  parts: EmailParts
}

/**
 * Renders a button rather than a `mailto:` anchor so the address is absent from
 * the HTML and the RSC payload until the visitor asks for it. Once revealed it
 * becomes a real anchor, so copy-link and open-in-new-tab behave as expected
 * for anyone without a mail client registered.
 */
export function RevealEmail({ parts }: Props) {
  const [address, setAddress] = useState<string | null>(null)

  if (address) {
    return (
      <a href={mailtoHref(address)} className={CTA_CLASSES}>
        {address}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={CTA_CLASSES}
      onClick={() => {
        const revealed = joinEmail(parts)
        posthog.capture(AnalyticsEvent.ContactEmailClicked)
        setAddress(revealed)
        window.location.href = mailtoHref(revealed)
      }}
    >
      {IDLE_LABEL}
    </button>
  )
}
