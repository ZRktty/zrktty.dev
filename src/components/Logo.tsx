'use client'

import Link from 'next/link'

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-space-grotesk text-[20px] font-bold uppercase tracking-[-0.05em] text-foreground leading-7"
    >
      ZRKTTY.DEV<span className="animate-pulse">_</span>
    </Link>
  )
}

export default Logo
