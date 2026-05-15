'use client'

import { MainNav } from '@/components/MainNav'
import { StatusBadge } from '@/components/StatusBadge'
import ThemeSelector from './ThemeSelector'
import Logo from './Logo'
import { HamburgerButton } from '@/components/mobile-nav'

interface HeaderProps {
  availability: string | null
}

export default function Header({ availability }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Logo />

        {/* Desktop: centered nav */}
        <MainNav />

        {/* Desktop: status badge + theme selector */}
        <div className="hidden md:flex items-center gap-4">
          <StatusBadge availability={availability} />
          <ThemeSelector />
        </div>

        {/* Mobile: hamburger */}
        <div className="md:hidden">
          <HamburgerButton />
        </div>
      </div>
    </header>
  )
}
