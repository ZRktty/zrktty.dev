'use client'

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import Nav from './Nav'
import ThemeSelector from './ThemeSelector'
import Logo from './Logo'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { MainNav } from '@/components/MainNav'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Logo />

        {/* Desktop: centered nav */}
        <MainNav />

        {/* Desktop: theme selector */}
        <div className="hidden md:flex items-center">
          <ThemeSelector />
        </div>

        {/* Mobile: hamburger + sheet */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-6">
                <Nav className="flex flex-col gap-5 text-base" />
                <div className="border-t border-border pt-4">
                  <ThemeSelector />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
