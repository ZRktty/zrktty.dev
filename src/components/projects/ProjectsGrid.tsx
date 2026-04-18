import { ProjectItem } from '@/types'
import { ProjectCard } from './ProjectCard'
import { FeaturedProjectCard } from './FeaturedProjectCard'

interface ProjectsGridProps {
  projects: ProjectItem[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const featured = projects.find((p) => p.highlighted) ?? projects[0]
  const rest = projects.filter((p) => p._id !== featured?._id)

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {featured && <FeaturedProjectCard project={featured} />}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {rest.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
