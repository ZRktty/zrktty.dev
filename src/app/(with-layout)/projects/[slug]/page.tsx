import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'
import { client } from '@/sanity/client'
import { PROJECT_QUERY, PROJECTS_SLUGS_QUERY, NEXT_PROJECT_QUERY } from '@/sanity/queries'
import { Project } from '@/sanity/types'

const fetchOptions = { next: { revalidate: 60 } }
import { NextProjectRef } from '@/types'
import { urlFor } from '@/sanity/utils'
import { RenderBodyContent } from '@/components/RenderBodyContent'
import { TechTag } from '@/components/shared/TechTag'
import { NextProjectNav } from '@/components/projects/NextProjectNav'
import { TextLink } from '@/components/shared/TextLink'
import { HERO_IMAGE_WIDTH, HERO_IMAGE_HEIGHT } from '@/constants'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(PROJECTS_SLUGS_QUERY)
  return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await client.fetch<Project | null>(PROJECT_QUERY, { slug }, fetchOptions)
  if (!project) return {}
  return {
    title: project.title,
    description: project.shortDescription,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await client.fetch<Project | null>(PROJECT_QUERY, { slug }, fetchOptions)

  if (!project) notFound()

  const heroUrl = project.thumbnail
    ? urlFor(project.thumbnail)?.width(HERO_IMAGE_WIDTH).height(HERO_IMAGE_HEIGHT).url()
    : null

  const nextProject =
    typeof project.order === 'number'
      ? await client.fetch<NextProjectRef | null>(
          NEXT_PROJECT_QUERY,
          { order: project.order },
          fetchOptions,
        )
      : null

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
      {/* Hero */}
      <section className="flex flex-col gap-8 mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="font-jetbrains-mono text-[11px] tracking-widest uppercase text-green-600 dark:text-ink-accent">
              Case Study
            </span>
            <h1 className="font-jetbrains-mono font-bold text-[36px] md:text-[52px] text-foreground dark:text-white leading-tight">
              {project.title}
            </h1>
            {project.shortDescription && (
              <p className="text-muted-foreground dark:text-ink-muted text-lg max-w-xl">
                {project.shortDescription}
              </p>
            )}
          </div>
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex gap-3 shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  // TODO(a11y): bg-green-600 text-white fails WCAG AA at this size — consider green-700/green-800 in light mode
                  className="font-jetbrains-mono text-[11px] tracking-widest uppercase bg-green-600 dark:bg-ink-accent text-white dark:text-ink-bg px-6 py-3 rounded-none hover:opacity-90 transition-opacity"
                >
                  Live Demo ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-jetbrains-mono text-[11px] tracking-widest uppercase border border-border dark:border-ink-border text-foreground dark:text-white px-6 py-3 hover:border-green-600 hover:text-green-600 dark:hover:border-ink-accent dark:hover:text-ink-accent transition-colors"
                >
                  Source ↗
                </a>
              )}
            </div>
          )}
        </div>

        {heroUrl && (
          <div className="relative w-full aspect-video overflow-hidden bg-muted dark:bg-ink-surface">
            <Image
              src={heroUrl}
              alt={project.title ? `${project.title} hero image` : 'Project hero image'}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1400px"
            />
          </div>
        )}
      </section>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-24">
        {/* Sidebar */}
        <aside className="md:col-span-3 flex flex-col gap-8">
          {project.client && (
            <div className="flex flex-col gap-2">
              <span className="font-jetbrains-mono text-[10.5px] tracking-widest uppercase text-muted-foreground dark:text-ink-muted">
                Client
              </span>
              <span className="font-jetbrains-mono text-sm text-foreground dark:text-ink-text">
                {project.client}
              </span>
            </div>
          )}
          {project.timeline && (
            <div className="flex flex-col gap-2">
              <span className="font-jetbrains-mono text-[10.5px] tracking-widest uppercase text-muted-foreground dark:text-ink-muted">
                Timeline
              </span>
              <span className="font-jetbrains-mono text-sm text-foreground dark:text-ink-text">
                {project.timeline}
              </span>
            </div>
          )}
          {project.role && project.role.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-jetbrains-mono text-[10.5px] tracking-widest uppercase text-muted-foreground dark:text-ink-muted">
                Role
              </span>
              <div className="flex flex-col gap-1">
                {project.role.map((r) => (
                  <span
                    key={r}
                    className="font-jetbrains-mono text-sm text-foreground dark:text-ink-text"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="font-jetbrains-mono text-[10.5px] tracking-widest uppercase text-muted-foreground dark:text-ink-muted">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tag) => (
                  <TechTag key={tag} label={tag} />
                ))}
              </div>
            </div>
          )}
          <TextLink href="/projects">← All Projects</TextLink>
        </aside>

        {/* Body */}
        <article className="md:col-span-9 prose prose-neutral dark:prose-invert max-w-none">
          {project.body && <RenderBodyContent value={project.body} />}
        </article>
      </div>

      {/* Next project */}
      {nextProject && <NextProjectNav title={nextProject.title} slug={nextProject.slug.current} />}
    </main>
  )
}
