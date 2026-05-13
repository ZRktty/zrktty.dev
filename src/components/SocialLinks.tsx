import React from 'react'
import type { SocialLink } from '@/types'
import socialLinksData from '@/data/socialLinks.json'
import { TextLink } from '@/components/shared/TextLink'

const PLATFORM_LABELS: Record<string, string> = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  stackoverflow: 'Stack Overflow',
  twitter: 'Twitter',
  x: 'X',
  email: 'Email',
}

interface SanityLink {
  platform: string
  url: string
}

interface Props {
  links?: SanityLink[]
}

const SocialLinks: React.FC<Props> = ({ links }) => {
  if (links) {
    const validLinks = links.filter((l) => l.platform && l.url)
    return (
      <div>
        <p className="font-vin-pro-mono font-medium text-sm text-foreground mb-2">Socials</p>
        <div className="flex flex-row flex-wrap items-center gap-4">
          {validLinks.map((link) => (
            <TextLink key={link.platform} href={link.url} external>
              {PLATFORM_LABELS[link.platform] ?? link.platform}
            </TextLink>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="font-vin-pro-mono font-medium text-sm text-foreground mb-2">Socials</p>
      <div className="flex flex-row flex-wrap items-center gap-4">
        {(socialLinksData as SocialLink[]).map((link) => (
          <TextLink key={link.name} href={link.url} external>
            {link.name}
          </TextLink>
        ))}
      </div>
    </div>
  )
}

export default SocialLinks
