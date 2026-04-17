'use client'

import * as React from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MenuButton() {
  return (
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Open menu</span>
    </Button>
  )
}
