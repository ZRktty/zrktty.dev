'use client'

import posthog from 'posthog-js'
import { AnalyticsEvent } from '@/constants/analyticsEvents'
import { CTA_OUTLINE_CLASSES } from '@/constants/ctaClasses'

interface Props {
  url?: string | null
  originalFilename?: string | null
}

export function CVDownload({ url, originalFilename }: Props) {
  if (!url) return null

  const filename = originalFilename ?? 'cv.pdf'
  const sep = url.includes('?') ? '&' : '?'
  const downloadUrl = `${url}${sep}dl=${encodeURIComponent(filename)}`

  return (
    <a
      href={downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={CTA_OUTLINE_CLASSES}
      onClick={() => posthog.capture(AnalyticsEvent.CvDownloaded, { filename })}
    >
      Download CV ↓
    </a>
  )
}
