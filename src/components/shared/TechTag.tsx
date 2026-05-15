interface TechTagProps {
  label: string
  role?: string
}

export function TechTag({ label, role }: TechTagProps) {
  return (
    <span
      role={role}
      className="font-jetbrains-mono text-[10.5px] text-muted-foreground dark:text-ink-muted bg-muted dark:bg-ink-surface px-2 py-0.5 whitespace-nowrap"
    >
      {label}
    </span>
  )
}
