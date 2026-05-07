'use client'

import React from 'react'
import LocalTime from '@/components/LocalTime'
import SocialLinks from '@/components/SocialLinks'

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border dark:border-ink-border bg-background dark:bg-ink-bg">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <SocialLinks />
        <div className="flex flex-col md:items-end gap-1">
          <LocalTime />
          <p className="font-vin-pro-mono text-[11px] text-muted-foreground dark:text-ink-dim">
            v2026.05 · Built solo · &copy; Zoltán Rakottyai
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
