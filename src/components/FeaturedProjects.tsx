import Link from 'next/link'
import { client } from '@/sanity/client'
import { HOMEPAGE_PROJECTS_QUERY } from '@/sanity/queries'
import { Project } from '@/sanity/types'

const options = { next: { revalidate: 60 } }

function StackList({ items }: { items: string[] }) {
  return (
    <div className="font-vin-pro-mono text-[10.5px] text-ink-muted flex flex-wrap gap-x-2.5">
      {items.map((item, i) => (
        <span key={item}>
          {item}
          {i < items.length - 1 && <span className="ml-2.5 text-ink-border-strong">·</span>}
        </span>
      ))}
    </div>
  )
}

export async function FeaturedProjects() {
  const projects = await client.fetch<Project[]>(HOMEPAGE_PROJECTS_QUERY, {}, options)

  return (
    <section id="featured-projects" className="py-16 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
        <div>
          <p className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-ink-accent mb-3">
            / Selected work
          </p>
          <h2 className="font-vin-pro-mono font-bold text-[22px] text-white leading-snug">
            Recent projects.
          </h2>
          <p className="text-[14px] text-ink-muted mt-1">
            A few things I&apos;ve shipped. Each links to a case study.
          </p>
        </div>
        <Link
          href="/projects"
          className="font-vin-pro-mono text-[12px] text-ink-accent hover:underline shrink-0"
        >
          All projects →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-border">
        {projects.map((project, i) => {
          const index = String(i + 1).padStart(3, '0')
          const slug = project.slug?.current ?? ''

          return (
            <Link
              key={project._id}
              href={`/projects/${slug}`}
              className="group flex flex-col gap-4 p-6 md:p-8 bg-ink-bg border border-ink-border transition-all duration-200 hover:border-ink-accent hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-vin-pro-mono text-[10.5px] text-ink-dim">{index}</span>
                {project.highlighted && (
                  <span className="font-vin-pro-mono text-[10px] uppercase tracking-widest bg-ink-surface text-ink-accent px-2 py-0.5">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="font-vin-pro-mono text-[17px] text-white leading-snug">
                {project.title}
              </h3>

              {project.shortDescription && (
                <p className="text-[13px] text-ink-muted leading-relaxed">
                  {project.shortDescription}
                </p>
              )}

              {project.techStack && project.techStack.length > 0 && (
                <StackList items={project.techStack} />
              )}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
