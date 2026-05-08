import { Project } from '@/sanity/types'
import { ProjectCard } from './ProjectCard'
import { FeaturedProjectCard } from './FeaturedProjectCard'

interface ProjectsGridProps {
  projects: Project[]
  offset?: number
}

export function ProjectsGrid({ projects, offset = 0 }: ProjectsGridProps) {
  const firstFeatured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => p._id !== firstFeatured?._id)
  const featuredIndex = firstFeatured ? 1 : 0

  return (
    <div className="flex flex-col gap-px bg-border dark:bg-ink-border">
      {firstFeatured && <FeaturedProjectCard project={firstFeatured} index={offset + 1} />}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
          {rest.map((project, i) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={offset + featuredIndex + i + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
