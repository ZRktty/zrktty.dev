interface Props {
  url: string
}

export function CVDownload({ url }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="inline-flex items-center justify-center px-6 py-3 border border-foreground dark:border-white text-foreground dark:text-white font-vin-pro-mono text-sm rounded-none transition-colors hover:border-green-600 hover:text-green-600 dark:hover:border-ink-accent dark:hover:text-ink-accent"
    >
      Download CV ↓
    </a>
  )
}
