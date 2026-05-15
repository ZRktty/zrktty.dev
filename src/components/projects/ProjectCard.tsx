import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/sanity/types'
import { urlFor } from '@/sanity/utils'
import { PROJECT_CARD_IMAGE_WIDTH, PROJECT_CARD_IMAGE_HEIGHT } from '@/constants'
import { TechTagList } from '@/components/shared/TechTagList'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const showImage = (project.featured || project.highlighted) && project.thumbnail
  const imageUrl = showImage
    ? urlFor(project.thumbnail!)
        ?.width(PROJECT_CARD_IMAGE_WIDTH)
        .height(PROJECT_CARD_IMAGE_HEIGHT)
        .url()
    : null

  const badge = project.featured ? 'Featured' : project.highlighted ? 'Highlighted' : null

  return (
    <Link
      href={`/projects/${project.slug?.current ?? ''}`}
      className="group flex flex-col bg-background dark:bg-ink-bg border border-border dark:border-ink-border transition-all duration-200 hover:border-green-600 dark:hover:border-ink-accent hover:-translate-y-0.5"
    >
      {imageUrl && (
        <div className="relative w-full overflow-hidden aspect-video bg-muted dark:bg-ink-surface">
          <Image
            src={imageUrl}
            alt={project.title ? `${project.title} thumbnail` : 'Project thumbnail'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {badge && (
            <span className="absolute top-3 right-3 font-jetbrains-mono text-[10px] uppercase tracking-widest bg-background/90 dark:bg-ink-bg/90 text-green-600 dark:text-ink-accent px-2.5 py-0.5">
              {badge}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-4 p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="font-jetbrains-mono text-[10.5px] text-muted-foreground dark:text-ink-dim">
            {String(index).padStart(3, '0')}
          </span>
          {badge && !imageUrl && (
            <span className="font-jetbrains-mono text-[10px] uppercase tracking-widest bg-muted dark:bg-ink-surface text-green-600 dark:text-ink-accent px-2 py-0.5">
              {badge}
            </span>
          )}
        </div>

        <h3 className="font-jetbrains-mono text-[17px] text-foreground dark:text-white leading-snug">
          {project.title}
        </h3>

        {project.shortDescription && (
          <p className="text-[13px] text-muted-foreground dark:text-ink-muted leading-relaxed flex-1">
            {project.shortDescription}
          </p>
        )}

        <TechTagList items={project.techStack} />
      </div>
    </Link>
  )
}
