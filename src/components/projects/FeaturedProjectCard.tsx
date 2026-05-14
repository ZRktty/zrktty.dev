import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/sanity/types'
import { urlFor } from '@/sanity/utils'
import { HERO_IMAGE_WIDTH, HERO_IMAGE_HEIGHT } from '@/constants'
import { StackList } from '@/components/shared/StackList'

interface FeaturedProjectCardProps {
  project: Project
  index: number
}

export function FeaturedProjectCard({ project, index }: FeaturedProjectCardProps) {
  const imageUrl = project.thumbnail
    ? urlFor(project.thumbnail)?.width(HERO_IMAGE_WIDTH).height(HERO_IMAGE_HEIGHT).url()
    : null

  return (
    <Link
      href={`/projects/${project.slug?.current ?? ''}`}
      className="group flex flex-col border border-border dark:border-ink-border transition-colors duration-200 hover:border-green-600 dark:hover:border-ink-accent"
    >
      {imageUrl && (
        <div className="relative w-full overflow-hidden aspect-video bg-muted dark:bg-ink-surface">
          <Image
            src={imageUrl}
            alt={project.title ? `${project.title} thumbnail` : 'Project thumbnail'}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="100vw"
          />
          <span className="absolute top-4 right-4 font-vin-pro-mono text-[10px] uppercase tracking-widest bg-background/90 dark:bg-ink-bg/90 text-green-600 dark:text-ink-accent px-3 py-1">
            Featured
          </span>
        </div>
      )}

      <div className="flex flex-col gap-4 p-6 md:p-8">
        <span className="font-vin-pro-mono text-[10.5px] text-muted-foreground dark:text-ink-dim">
          {String(index).padStart(3, '0')}
        </span>

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
