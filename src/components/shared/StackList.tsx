interface StackListProps {
  items: string[]
}

export function StackList({ items }: StackListProps) {
  return (
    <div className="font-jetbrains-mono text-[10.5px] text-muted-foreground dark:text-ink-muted flex flex-wrap gap-x-2.5">
      {items.map((item, i) => (
        <span key={item}>
          {item}
          {i < items.length - 1 && (
            <span className="ml-2.5 text-border dark:text-ink-border-strong">·</span>
          )}
        </span>
      ))}
    </div>
  )
}
