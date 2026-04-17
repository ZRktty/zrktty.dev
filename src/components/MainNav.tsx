'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { NAV_ITEMS } from '@/constants'
import { cn } from '@/lib/utils'

export function MainNav() {
  const pathname = usePathname()

  return (
    <NavigationMenu className="hidden md:flex p-6">
      <NavigationMenuList>
        {NAV_ITEMS.map(({ label, href }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive && 'text-primary font-semibold',
                )}
              >
                <Link href={href}>{label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
