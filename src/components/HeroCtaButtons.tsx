'use client'

import Link from 'next/link'
import posthog from 'posthog-js'
import { AnalyticsEvent } from '@/constants/analyticsEvents'

interface Props {
  bookingUrl: string | null
}

export function HeroCtaButtons({ bookingUrl }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {bookingUrl && (
        <Link
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          // TODO(a11y): bg-green-600 text-white fails WCAG AA — consider green-700/green-800 in light mode
          className="inline-flex items-center justify-center px-6 py-3 bg-green-600 dark:bg-ink-accent text-white dark:text-ink-bg font-jetbrains-mono font-bold text-sm rounded-none transition-opacity hover:opacity-90"
          onClick={() => posthog.capture(AnalyticsEvent.BookCallClicked, { location: 'hero' })}
        >
          Book a 30-min call →
        </Link>
      )}
      <a
        href="#featured-projects"
        className="inline-flex items-center justify-center px-6 py-3 border border-foreground dark:border-white text-foreground dark:text-white font-jetbrains-mono text-sm rounded-none transition-colors hover:border-green-600 hover:text-green-600 dark:hover:border-ink-accent dark:hover:text-ink-accent"
      >
        See recent work
      </a>
    </div>
  )
}
