import { client } from '@/sanity/client'
import { EXPERIENCE_QUERY } from '@/sanity/queries'
import { ExperienceList } from '@/components/experience/ExperienceList'
import type { ExperienceItem } from '@/types'

export default async function ExperiencePage() {
  const items = await client.fetch<ExperienceItem[]>(
    EXPERIENCE_QUERY,
    {},
    { next: { revalidate: 30 } },
  )

  return (
    <div className="container mx-auto min-h-screen max-w-3xl py-6 md:py-12">
      <h1 className="mb-6 font-vin-pro-mono text-4xl font-bold uppercase tracking-tight text-foreground md:mb-8 md:text-5xl">
        Experience
      </h1>
      <ExperienceList items={items} />
    </div>
  )
}
