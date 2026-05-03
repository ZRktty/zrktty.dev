import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/sanity/types'
import { urlFor } from '@/sanity/utils'
import { TechTag } from './TechTag'
import { PROJECT_FEATURED_IMAGE_WIDTH, PROJECT_FEATURED_IMAGE_HEIGHT } from '@/constants'

interface FeaturedProjectCardProps {
  project: Project
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const imageUrl = project.thumbnail
    ? urlFor(project.thumbnail)
        ?.width(PROJECT_FEATURED_IMAGE_WIDTH)
        .height(PROJECT_FEATURED_IMAGE_HEIGHT)
        .url()
    : null

  return (
    <div className="flex flex-col bg-card border border-border group relative">
      <div className="relative w-full overflow-hidden aspect-video bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title ? `${project.title} thumbnail` : 'Project thumbnail'}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute top-4 right-4 font-mono text-xs tracking-widest uppercase bg-primary text-primary-foreground px-3 py-1">
          Featured
        </span>
      </div>
      <div className="flex flex-col gap-3 p-6 md:p-8">
        <h3 className="font-bold text-2xl md:text-3xl text-foreground leading-snug">
          {project.title}
        </h3>
        {project.shortDescription && (
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            {project.shortDescription}
          </p>
        )}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tag) => (
              <TechTag key={tag} label={tag} />
            ))}
          </div>
        )}
        <Link
          href={`/projects/${project.slug?.current ?? ''}`}
          className="mt-2 text-sm font-mono text-foreground hover:text-primary transition-colors self-start"
        >
          View Case Study →
        </Link>
      </div>
    </div>
  )
}
