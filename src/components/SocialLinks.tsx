import React from 'react'
import Link from 'next/link'
import type { SocialLink } from '@/types'
import socialLinksData from '@/data/socialLinks.json'

const BRAND_HOVER: Record<string, string> = {
  LinkedIn: 'hover:text-[#0077B5]',
  GitHub: 'hover:text-foreground',
  'Stack Overflow': 'hover:text-[#F48024]',
}

const SocialLinks: React.FC = () => {
  return (
    <div>
      <p className="font-vin-pro-mono font-medium text-sm text-foreground mb-2">Socials</p>
      <div className="flex flex-row flex-wrap items-center gap-4">
        {(socialLinksData as SocialLink[]).map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-vin-pro-mono font-medium text-sm text-muted-foreground transition-colors duration-200 line-grow ${BRAND_HOVER[link.name] ?? 'hover:text-foreground'}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SocialLinks
