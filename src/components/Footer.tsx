'use client'

import React from 'react'
import LocalTime from '@/components/LocalTime'
import SiteVersion from '@/components/SiteVersion'
import { Separator } from '@/components/ui/separator'
import SocialLinks from '@/components/SocialLinks'

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border bg-[#F5F5F5] dark:bg-[#0a0a0a] sticky bottom-0 z-0">
      <div className="px-4 md:px-8 py-12 flex flex-col gap-8">
        <SocialLinks />
        <Separator />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SiteVersion />
          <p className="font-ibm-plex-mono text-sm text-muted-foreground md:text-center">
            2026 &copy; Zoltan Rakottyai &mdash; All rights reserved
          </p>
          <LocalTime />
        </div>
      </div>
    </footer>
  )
}

export default Footer
