import { Project } from '@/sanity/types'
import { ProjectCard } from './ProjectCard'
import { FeaturedProjectCard } from './FeaturedProjectCard'

interface ProjectsGridProps {
  projects: Project[]
  offset?: number
}

export function ProjectsGrid({ projects, offset = 0 }: ProjectsGridProps) {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <div className="flex flex-col gap-px bg-border dark:bg-ink-border">
      {featured.map((project, i) => (
        <FeaturedProjectCard key={project._id} project={project} index={offset + i + 1} />
      ))}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
          {rest.map((project, i) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={offset + featured.length + i + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
