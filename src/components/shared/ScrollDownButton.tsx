'use client'

import { ChevronDown } from 'lucide-react'

export function ScrollDownButton() {
  const handleClick = () => {
    document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to featured projects"
      className="animate-levitate w-12 h-12 flex items-center justify-center border border-border rounded-none text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-200"
    >
      <ChevronDown className="w-5 h-5" />
    </button>
  )
}
