import React from 'react'
import type { SocialLink } from '@/types'
import socialLinksData from '@/data/socialLinks.json'
import { TextLink } from '@/components/shared/TextLink'

const SocialLinks: React.FC = () => {
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
