import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/sanity/types'
import { urlFor } from '@/sanity/utils'
import { TechTag } from './TechTag'
import { HERO_IMAGE_WIDTH, HERO_IMAGE_HEIGHT } from '@/constants'

interface FeaturedProjectCardProps {
  project: Project
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const imageUrl = project.thumbnail
    ? urlFor(project.thumbnail)?.width(HERO_IMAGE_WIDTH).height(HERO_IMAGE_HEIGHT).url()
    : null

  return (
    <div className="flex flex-col bg-card border border-border group">
      <Link
        href={`/projects/${project.slug?.current ?? ''}`}
        className="relative w-full overflow-hidden aspect-video bg-muted block"
      >
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
      </Link>
      <div className="flex flex-col gap-3 p-6 md:p-8">
        <Link href={`/projects/${project.slug?.current ?? ''}`}>
          <h3 className="font-vin-pro-mono font-bold text-2xl md:text-3xl text-foreground leading-snug hover:text-primary transition-colors">
            {project.title}
          </h3>
        </Link>
        {project.shortDescription && (
          <p className="font-[family-name:var(--font-ibm-plex-sans)] text-muted-foreground text-base leading-relaxed max-w-2xl">
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
      </div>
      <Link
        href={`/projects/${project.slug?.current ?? ''}`}
        className="flex items-center justify-between px-6 py-4 bg-foreground text-background hover:bg-primary transition-colors"
      >
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-widest uppercase">
          View Case Study
        </span>
        <span className="text-lg">→</span>
      </Link>
    </div>
  )
}
