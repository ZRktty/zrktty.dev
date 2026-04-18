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
    <div className="flex flex-col gap-4 bg-card border border-border p-0 group">
      <div className="relative w-full overflow-hidden aspect-video bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title ?? ''}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
      </div>
      <div className="flex flex-col gap-3 px-5 pb-5">
        <h3 className="font-bold text-xl text-foreground leading-snug">{project.title}</h3>
        {project.shortDescription && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
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
          className="mt-1 text-sm font-mono text-foreground hover:text-primary transition-colors self-end"
        >
          View Project →
        </Link>
      </div>
    </div>
  )
}
