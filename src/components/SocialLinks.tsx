import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const COLOR_CLASS_MAP: Record<string, string> = {
  'blue-600': 'text-blue-600',
  'gray-800': 'text-gray-800',
  black: 'text-black',
  'orange-600': 'text-orange-600',
}

interface SocialLink {
  name: string
  url: string
  color: string
}

const SocialLinks: React.FC = () => {
  const [links, setLinks] = useState<SocialLink[]>([])

  useEffect(() => {
    const fetchLinks = async () => {
      const data = await import('@/data/socialLinks.json')
      setLinks(data.default)
    }

    fetchLinks()
  }, [])

  return (
    <div className="p-4 ">
      <h5>Socials</h5>
      <div className="flex flex-row items-center space-x-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${COLOR_CLASS_MAP[link.color] ?? ''} line-grow`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SocialLinks
