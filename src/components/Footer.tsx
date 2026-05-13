'use client'

import React from 'react'
import LocalTime from '@/components/LocalTime'
import SiteVersion from '@/components/SiteVersion'
import { Separator } from '@/components/ui/separator'
import SocialLinks from '@/components/SocialLinks'

interface FooterProps {
  links?: Array<{ platform: string; url: string }>
}

const Footer: React.FC<FooterProps> = ({ links }) => {
  return (
    <footer className="w-full sticky bottom-0 z-0 border-t border-border bg-footer-bg">
      <div className="px-4 md:px-8 py-12 flex flex-col gap-8">
        <SocialLinks links={links} />
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
