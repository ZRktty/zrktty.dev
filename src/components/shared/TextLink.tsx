import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TextLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}

export function TextLink({ href, children, external = false, className }: TextLinkProps) {
  const base =
    'font-jetbrains-mono font-medium text-sm text-muted-foreground transition-colors duration-200 line-grow hover:text-green-600 dark:hover:text-ink-accent'

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, className)}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={cn(base, className)}>
      {children}
    </Link>
  )
}
