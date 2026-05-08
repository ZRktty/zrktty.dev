import { Project } from '@/sanity/types'
import { ProjectCard } from './ProjectCard'

interface ProjectsGridProps {
  projects: Project[]
  offset?: number
}

export function ProjectsGrid({ projects, offset = 0 }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border dark:bg-ink-border">
      {projects.map((project, i) => (
        <ProjectCard key={project._id} project={project} index={offset + i + 1} />
      ))}
    </div>
  )
}
