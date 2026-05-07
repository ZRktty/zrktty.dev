export function StatusBadge() {
  return (
    <div className="hidden md:flex items-center gap-2 font-vin-pro-mono text-[11.5px] text-ink-accent">
      <span className="relative flex h-[7px] w-[7px]">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink-accent opacity-50" />
        <span className="relative inline-flex h-full w-full rounded-full bg-ink-accent" />
      </span>
      <span>Available · Q2 2026</span>
    </div>
  )
}
