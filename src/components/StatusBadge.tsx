interface StatusBadgeProps {
  availability: string | null
}

export function StatusBadge({ availability }: StatusBadgeProps) {
  if (!availability) return null

  // TODO(a11y): green-600 on white fails WCAG AA at this font size — switch to green-700 or green-800 in light mode
  return (
    <div className="hidden md:flex items-center gap-2 font-vin-pro-mono text-[11.5px] text-green-600 dark:text-ink-accent">
      <span className="relative flex h-[7px] w-[7px]">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 dark:bg-ink-accent opacity-50" />
        <span className="relative inline-flex h-full w-full rounded-full bg-green-600 dark:bg-ink-accent" />
      </span>
      <span>{availability}</span>
    </div>
  )
}
