import Link from 'next/link'
import { client } from '@/sanity/client'
import { HOMEPAGE_PROJECTS_QUERY } from '@/sanity/queries'
import { Project } from '@/sanity/types'
import { ProjectsGrid } from './ProjectsGrid'

const options = { next: { revalidate: 60 } }

export async function HomepageProjects() {
  const projects = await client.fetch<Project[]>(HOMEPAGE_PROJECTS_QUERY, {}, options)

  if (projects.length === 0) return null

  return (
    <section className="container mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
      <div className="flex items-end justify-between mb-3">
        <h2 className="font-bold text-3xl md:text-4xl text-foreground">Featured projects</h2>
        <Link
          href="/projects"
          className="font-jetbrains-mono text-[11px] tracking-widest uppercase text-muted-foreground hover:text-green-600 dark:hover:text-ink-accent transition-colors shrink-0 mb-1"
        >
          Check all projects →
        </Link>
      </div>
      <p className="text-muted-foreground mb-8 md:mb-12">
        Some of the projects I&apos;ve been thinking about
      </p>
      <ProjectsGrid projects={projects} />
    </section>
  )
}
