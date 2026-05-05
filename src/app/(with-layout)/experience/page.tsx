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
      {/* Header */}
      <section className="mb-16 md:mb-24 flex flex-col gap-6 md:gap-8">
        {/* CURRICULUM VITAE label */}
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-[#95aaff]" />
          <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.1em] text-[#ff7162]">
            Curriculum Vitae
          </span>
        </div>

        {/* Heading — two-line with gradient on second word */}
        <h1 className="flex flex-col font-space-grotesk font-bold leading-none tracking-tight">
          <span className="text-5xl text-foreground md:text-8xl">Engineering</span>
          <span className="bg-gradient-to-r from-[#95aaff] to-[#3766ff] bg-clip-text text-5xl text-transparent md:text-8xl">
            Experience
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl font-ibm-plex-mono text-base leading-relaxed text-muted-foreground">
          A chronological account of technical systems architected, teams led, and digital products
          deployed across various environments.
        </p>
      </section>

      <ExperienceList items={items} />
    </main>
  )
}
