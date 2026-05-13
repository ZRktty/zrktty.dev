import Link from 'next/link'

const PLATFORM_LABELS: Record<string, string> = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  email: 'Email',
}

interface Props {
  links: Array<{ platform: string; url: string }>
}

export function AboutSocialLinks({ links }: Props) {
  const validLinks = links.filter((l) => l.platform && l.url)
  if (validLinks.length === 0) return null

  return (
    <div className="flex flex-wrap gap-6">
      {validLinks.map((link) => (
        <Link
          key={link.platform}
          href={link.url}
          target={link.platform === 'email' ? undefined : '_blank'}
          rel={link.platform === 'email' ? undefined : 'noopener noreferrer'}
          className="font-vin-pro-mono text-[12px] text-muted-foreground dark:text-ink-muted hover:text-green-600 dark:hover:text-ink-accent transition-colors"
        >
          {PLATFORM_LABELS[link.platform] ?? link.platform} ↗
        </Link>
      ))}
    </div>
  )
}
