'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Oops! Page not found</h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        The page you&#39;re looking for seems to have wandered off. Let&#39;s get you back on track.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => router.back()}>Go Back</Button>
        <Button variant="outline" asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  )
}
