import { TechTag } from '@/components/shared/TechTag'

interface TechTagListProps {
  items: string[] | null | undefined
  label?: string
}

export function TechTagList({ items, label }: TechTagListProps) {
  const filtered = items?.filter((item) => item.trim()) ?? []
  if (filtered.length === 0) return null
  return (
    <div role="list" aria-label={label} className="flex flex-wrap gap-2">
      {filtered.map((item, i) => (
        <TechTag key={`${i}-${item}`} label={item} role="listitem" />
      ))}
    </div>
  )
}
