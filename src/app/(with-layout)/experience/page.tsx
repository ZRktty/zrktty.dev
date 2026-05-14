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
          <div className="h-px w-12 bg-green-600 dark:bg-ink-accent" />
          <span className="font-jetbrains-mono text-[11px] uppercase tracking-widest text-green-600 dark:text-ink-accent">
            Curriculum Vitae
          </span>
        </div>
        <h1 className="mb-4 font-jetbrains-mono text-5xl font-bold uppercase tracking-tight md:text-7xl">
          <span className="block text-foreground dark:text-white">Engineering</span>
          <span className="block text-green-600 dark:text-ink-accent">Experience</span>
        </h1>
        <p className="max-w-xl text-base text-muted-foreground dark:text-ink-muted">
          A chronological account of technical systems architected, teams led, and digital products
          deployed across various environments.
        </p>
      </div>

      <ExperienceList items={items} />
    </main>
  )
}
