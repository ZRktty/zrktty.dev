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
    <main className="container mx-auto min-h-screen max-w-6xl px-4 md:px-6 py-12 md:py-20">
      {/* Hero */}
      <div className="mb-12 md:mb-16">
        <div className="mb-4 flex items-center gap-4">
          <div className="h-px w-12 bg-primary" />
          <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.1em] text-primary">
            Curriculum Vitae
          </span>
        </div>
        <h1 className="mb-4 font-vin-pro-mono text-5xl font-bold uppercase tracking-tight text-foreground md:text-7xl">
          Engineering Experience
        </h1>
        <p className="max-w-xl font-ibm-plex-mono text-base text-muted-foreground">
          A chronological account of technical systems architected, teams led, and digital products
          deployed across various environments.
        </p>
      </div>

      <ExperienceList items={items} />
    </main>
  )
}
