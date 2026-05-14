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
    <main className="mx-auto min-h-screen max-w-6xl py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-background dark:bg-ink-bg">
      <div className="mb-10">
        <p className="font-jetbrains-mono text-[11px] uppercase tracking-widest text-green-600 dark:text-ink-accent mb-3">
          / Projects
        </p>
        <h1 className="font-jetbrains-mono font-bold text-[28px] md:text-[36px] text-foreground dark:text-white leading-snug">
          All projects.
        </h1>
        <p className="text-[14px] text-muted-foreground dark:text-ink-muted mt-1">
          A full list of things I&apos;ve shipped.
        </p>
      </div>

      {projects.length > 0 ? (
        <>
          <ProjectsGrid projects={projects} offset={offset} />
          {totalPages > 1 && <PaginationNav currentPage={page} totalPages={totalPages} />}
        </>
      ) : (
        <p className="font-jetbrains-mono text-[13px] text-muted-foreground dark:text-ink-muted">
          No projects found.
        </p>
      )}
    </main>
  )
}
