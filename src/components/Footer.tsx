'use client'

import React from 'react'
import LocalTime from '@/components/LocalTime'
import SiteVersion from '@/components/SiteVersion'
import { Separator } from '@/components/ui/separator'
import SocialLinks from '@/components/SocialLinks'

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-4 ">
      <SocialLinks />
      <Separator />
      <div className="p-4 flex justify-between">
        <SiteVersion />
        <div className="text-center hidden md:block">Made with ❤️ with Next.js</div>
        <LocalTime />
      </div>
    </footer>
  )
}

export default Footer
