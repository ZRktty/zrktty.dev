import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/sanity/types'
import { urlFor } from '@/sanity/utils'
import { HERO_IMAGE_WIDTH, HERO_IMAGE_HEIGHT } from '@/constants'

interface FeaturedProjectCardProps {
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

export function FeaturedProjectCard({ project, index }: FeaturedProjectCardProps) {
  const imageUrl = project.thumbnail
    ? urlFor(project.thumbnail)?.width(HERO_IMAGE_WIDTH).height(HERO_IMAGE_HEIGHT).url()
    : null

  return (
    <Link
      href={`/projects/${project.slug?.current ?? ''}`}
      className="group flex flex-col border border-border dark:border-ink-border transition-all duration-200 hover:border-green-600 dark:hover:border-ink-accent"
    >
      {imageUrl && (
        <div className="relative w-full overflow-hidden aspect-video bg-muted dark:bg-ink-surface">
          <Image
            src={imageUrl}
            alt={project.title ? `${project.title} thumbnail` : 'Project thumbnail'}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="font-vin-pro-mono text-[10.5px] text-muted-foreground dark:text-ink-dim">
            {String(index).padStart(3, '0')}
          </span>
          <span className="font-vin-pro-mono text-[10px] uppercase tracking-widest bg-muted dark:bg-ink-surface text-green-600 dark:text-ink-accent px-2 py-0.5">
            Featured
          </span>
        </div>

        <h3 className="font-vin-pro-mono font-bold text-[22px] text-foreground dark:text-white leading-snug">
          {project.title}
        </h3>

        {project.shortDescription && (
          <p className="text-[14px] text-muted-foreground dark:text-ink-muted leading-relaxed max-w-2xl">
            {project.shortDescription}
          </p>
        )}

        {project.techStack && project.techStack.length > 0 && (
          <StackList items={project.techStack} />
        )}
      </div>
    </Link>
  )
}
