'use client'

import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <span className="font-semibold">ZRktty</span>
      <div className="ml-0.5 bg-black text-white px-1.5 rounded text-sm font-bold dark:bg-white dark:text-black">
        .dev
      </div>
    </Link>
  )
}

export default Logo
