import { client } from '@/sanity/client'
import { PROJECTS_QUERY, PROJECTS_COUNT_QUERY } from '@/sanity/queries'
import { Project } from '@/sanity/types'
import { ProjectsGrid } from '@/components/projects/ProjectsGrid'
import { PaginationNav } from '@/components/projects/PaginationNav'
import { PROJECTS_PAGE_SIZE } from '@/constants'

const options = { next: { revalidate: 60 } }

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function ProjectsPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)
  const offset = (page - 1) * PROJECTS_PAGE_SIZE

  const [projects, total] = await Promise.all([
    client.fetch<Project[]>(PROJECTS_QUERY, { offset, limit: PROJECTS_PAGE_SIZE }, options),
    client.fetch<number>(PROJECTS_COUNT_QUERY, {}, options),
  ])

  const totalPages = Math.ceil(total / PROJECTS_PAGE_SIZE)

  return (
    <main className="container mx-auto min-h-screen max-w-6xl py-12 md:py-16 px-4 md:px-6">
      <div className="flex items-end justify-between mb-3">
        <h1 className="font-bold text-3xl md:text-4xl text-foreground">All projects</h1>
      </div>
      <p className="text-muted-foreground mb-8 md:mb-12">
        Some of the projects I&apos;ve been thinking about
      </p>
      {projects.length > 0 ? (
        <>
          <ProjectsGrid projects={projects} />
          {totalPages > 1 && <PaginationNav currentPage={page} totalPages={totalPages} />}
        </>
      ) : (
        <p className="text-muted-foreground">No projects found.</p>
      )}
    </main>
  )
}
