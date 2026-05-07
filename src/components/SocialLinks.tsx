import React from 'react'
import Link from 'next/link'
import type { SocialLink } from '@/types'
import socialLinksData from '@/data/socialLinks.json'

const SocialLinks: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-6">
      {(socialLinksData as SocialLink[]).map((link) => (
        <Link
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-vin-pro-mono text-[11.5px] text-muted-foreground dark:text-ink-muted transition-colors duration-200 hover:text-green-600 dark:hover:text-ink-accent"
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export default SocialLinks
