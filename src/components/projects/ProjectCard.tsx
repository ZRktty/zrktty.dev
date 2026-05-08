import Link from 'next/link'
import { Project } from '@/sanity/types'

interface ProjectCardProps {
  project: Project
  index: number
}

function StackList({ items }: { items: string[] }) {
  return (
    <div className="font-vin-pro-mono text-[10.5px] text-muted-foreground dark:text-ink-muted flex flex-wrap gap-x-2.5">
      {items.map((item, i) => (
        <span key={item}>
          {item}
          {i < items.length - 1 && (
            <span className="ml-2.5 text-border dark:text-ink-border-strong">·</span>
          )}
        </span>
      ))}
    </div>
  )
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const slug = project.slug?.current ?? ''

  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col gap-4 p-6 md:p-8 bg-background dark:bg-ink-bg border border-border dark:border-ink-border transition-all duration-200 hover:border-green-600 dark:hover:border-ink-accent hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between">
        <span className="font-vin-pro-mono text-[10.5px] text-muted-foreground dark:text-ink-dim">
          {String(index).padStart(3, '0')}
        </span>
        {project.highlighted && (
          <span className="font-vin-pro-mono text-[10px] uppercase tracking-widest bg-muted dark:bg-ink-surface text-green-600 dark:text-ink-accent px-2 py-0.5">
            Featured
          </span>
        )}
      </div>

      <h3 className="font-vin-pro-mono text-[17px] text-foreground dark:text-white leading-snug">
        {project.title}
      </h3>

      {project.shortDescription && (
        <p className="text-[13px] text-muted-foreground dark:text-ink-muted leading-relaxed flex-1">
          {project.shortDescription}
        </p>
      )}

      {project.techStack && project.techStack.length > 0 && <StackList items={project.techStack} />}
    </Link>
  )
}
