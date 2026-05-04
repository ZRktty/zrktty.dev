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
              'transition-colors duration-200 font-[family-name:var(--font-space-grotesk)] tracking-[-0.025em]',
              isActive
                ? 'text-[var(--nav-link-active)] font-bold'
                : 'text-[var(--nav-link-muted)] font-normal hover:text-[var(--nav-link-active)]',
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
