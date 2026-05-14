interface Props {
  status: string
}

export function AvailabilityBadge({ status }: Props) {
  return (
    <div className="inline-flex items-center gap-2 font-jetbrains-mono text-[11.5px] text-green-600 dark:text-ink-accent">
      <span className="relative flex h-[7px] w-[7px]">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 dark:bg-ink-accent opacity-50" />
        <span className="relative inline-flex h-full w-full rounded-full bg-green-600 dark:bg-ink-accent" />
      </span>
      <span>{status}</span>
    </div>
  )
}
