'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/constants'
import { cn } from '@/lib/utils'

interface NavProps {
  className?: string
}

const Nav: React.FC<NavProps> = ({ className = '' }) => {
  const pathname = usePathname()

  return (
    <nav className={className}>
      {NAV_ITEMS.map(({ label, href }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'hover:text-primary transition-colors',
              isActive ? 'text-primary font-semibold' : 'text-foreground',
            )}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav
