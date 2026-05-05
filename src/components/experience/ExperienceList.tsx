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
    <section className="flex flex-col gap-0">
      <div className="mb-12 border-b border-border pb-4 md:mb-16">
        <h2 className="font-space-grotesk font-bold text-2xl tracking-tight text-foreground md:text-3xl">
          Experience
        </h2>
      </div>
      <ul className="flex flex-col gap-12 md:gap-20">
        {items.map((item) => (
          <li key={item._id}>
            <ExperienceCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}
