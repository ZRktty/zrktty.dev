import { TechTag } from '@/components/shared/TechTag'

interface TechTagListProps {
  items: string[] | null | undefined
  label?: string
}

export function TechTagList({ items, label }: TechTagListProps) {
  const filtered = [...new Set(items?.filter((item) => item.trim()) ?? [])]
  if (filtered.length === 0) return null
  return (
    <ul aria-label={label} className="flex list-none flex-wrap gap-2">
      {filtered.map((item) => (
        <li key={item}>
          <TechTag label={item} />
        </li>
      ))}
    </ul>
  )
}
