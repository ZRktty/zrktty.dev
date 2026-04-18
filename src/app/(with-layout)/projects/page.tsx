import Link from 'next/link'
import { client } from '@/sanity/client'
import { PROJECTS_QUERY } from '@/sanity/queries'
import { ProjectItem } from '@/types'
import { ProjectsGrid } from '@/components/projects/ProjectsGrid'

const options = { next: { revalidate: 60 } }

export default async function ProjectsPage() {
  const projects = await client.fetch<ProjectItem[]>(PROJECTS_QUERY, {}, options)

  return (
    <main className="container mx-auto min-h-screen max-w-6xl py-12 md:py-16 px-4 md:px-6">
      <div className="flex items-end justify-between mb-3">
        <h1 className="font-bold text-3xl md:text-4xl text-foreground">Featured projects</h1>
        <Link
          href="/projects"
          className="hidden md:inline-flex font-mono text-xs tracking-widest uppercase border border-border px-4 py-2 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
        >
          Check all projects
        </Link>
      </div>
      <p className="text-muted-foreground mb-8 md:mb-12">
        Some of the projects I&apos;ve been thinking on
      </p>
      {projects.length > 0 ? (
        <ProjectsGrid projects={projects} />
      ) : (
        <p className="text-muted-foreground">No projects found.</p>
      )}
    </main>
  )
}
