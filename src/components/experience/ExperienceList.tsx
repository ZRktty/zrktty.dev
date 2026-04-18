import type { ExperienceItem } from '@/types'
import { ExperienceCard } from './ExperienceCard'

interface Props {
  items: ExperienceItem[]
}

export function ExperienceList({ items }: Props) {
  if (items.length === 0) {
    return <p className="text-muted-foreground">No experience entries yet.</p>
  }

  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item._id}>
          <ExperienceCard item={item} />
        </li>
      ))}
    </ul>
  )
}
