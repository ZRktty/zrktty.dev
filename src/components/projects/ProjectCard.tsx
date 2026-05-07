import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/sanity/types'
import { urlFor } from '@/sanity/utils'
import { TechTag } from './TechTag'
import { PROJECT_CARD_IMAGE_WIDTH, PROJECT_CARD_IMAGE_HEIGHT } from '@/constants'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.thumbnail
    ? urlFor(project.thumbnail)
        ?.width(PROJECT_CARD_IMAGE_WIDTH)
        .height(PROJECT_CARD_IMAGE_HEIGHT)
        .url()
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
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
      </Link>
      <div className="flex flex-col flex-1 px-5 py-5">
        <div className="flex flex-col gap-3">
          <Link href={`/projects/${project.slug?.current ?? ''}`}>
            <h3 className="font-vin-pro-mono font-bold text-xl text-foreground leading-snug hover:text-primary transition-colors">
              {project.title}
            </h3>
          </Link>
          {project.shortDescription && (
            <p className="font-[family-name:var(--font-ibm-plex-sans)] text-muted-foreground text-sm leading-relaxed line-clamp-3">
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
        <div className="flex justify-end mt-4">
          <Link
            href={`/projects/${project.slug?.current ?? ''}`}
            className="line-grow opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-widest uppercase text-foreground hover:text-primary flex items-center gap-1.5"
          >
            View Project <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
