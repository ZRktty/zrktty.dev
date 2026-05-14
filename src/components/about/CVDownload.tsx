interface Props {
  url: string
  originalFilename?: string
}

export function CVDownload({ url, originalFilename }: Props) {
  const filename = originalFilename ?? 'cv.pdf'
  const downloadUrl = `${url}?dl=${encodeURIComponent(filename)}`

  return (
    <a
      href={downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-6 py-3 border border-foreground dark:border-white text-foreground dark:text-white font-jetbrains-mono text-sm rounded-none transition-colors hover:border-green-600 hover:text-green-600 dark:hover:border-ink-accent dark:hover:text-ink-accent"
    >
      Download CV ↓
    </a>
  )
}
