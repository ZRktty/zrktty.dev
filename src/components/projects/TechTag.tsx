interface TechTagProps {
  label: string
}

export function TechTag({ label }: TechTagProps) {
  return (
    <span className="bg-muted text-muted-foreground font-mono text-xs px-2 py-1 whitespace-nowrap">
      {label}
    </span>
  )
}
