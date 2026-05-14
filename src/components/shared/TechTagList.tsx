import { TechTag } from '@/components/projects/TechTag'

interface TechTagListProps {
  items: string[]
}

export function TechTagList({ items }: TechTagListProps) {
  if (!items || items.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <TechTag key={item} label={item} />
      ))}
    </div>
  )
}
