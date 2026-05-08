interface TechTagProps {
  label: string
}

export function TechTag({ label }: TechTagProps) {
  return (
    <span className="font-vin-pro-mono text-[10.5px] text-muted-foreground dark:text-ink-muted bg-muted dark:bg-ink-surface px-2 py-0.5 whitespace-nowrap">
      {label}
    </span>
  )
}
