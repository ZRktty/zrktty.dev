'use client'

import Link from 'next/link'
import posthog from 'posthog-js'
import { AnalyticsEvent } from '@/constants/analyticsEvents'
import { CTA_OUTLINE_CLASSES, CTA_SOLID_CLASSES } from '@/constants/ctaClasses'

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
          className={CTA_SOLID_CLASSES}
          onClick={() => posthog.capture(AnalyticsEvent.BookCallClicked, { location: 'hero' })}
        >
          Book a 30-min call →
        </Link>
      )}
      <a href="#featured-projects" className={CTA_OUTLINE_CLASSES}>
        See recent work
      </a>
    </div>
  )
}
