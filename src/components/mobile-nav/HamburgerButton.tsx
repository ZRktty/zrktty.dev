'use client'

import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNav } from './NavContext'

export function HamburgerButton() {
  const { isOpen, toggle } = useNav()

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <X className="h-5 w-5 transition-transform duration-300" />
      ) : (
        <Menu className="h-5 w-5 transition-transform duration-300" />
      )}
    </Button>
  )
}
