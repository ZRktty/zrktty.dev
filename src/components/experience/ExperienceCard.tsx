import Image from 'next/image'
import { RenderBodyContent } from '@/components/RenderBodyContent'
import { TechTag } from '@/components/projects/TechTag'
import type { ExperienceItem, ExperienceType } from '@/types'

const TYPE_LABELS: Record<ExperienceType, string> = {
  fulltime: 'Full-time',
  freelance: 'Freelance',
  contract: 'Contract',
}

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

interface Props {
  item: ExperienceItem
}

export function ExperienceCard({ item }: Props) {
  const { company, role, webUrl, type, startDate, endDate, description, techStack, logo } = item

  return (
    <article className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-x-16">
      {/* Left column — date */}
      <div className="flex flex-row items-baseline gap-3 md:col-span-3 md:flex-col md:items-start md:gap-2 md:pt-2">
        <span className="font-ibm-plex-mono text-sm font-semibold text-[#95aaff]">
          {formatDate(startDate)} — {endDate ? formatDate(endDate) : 'Present'}
        </span>
      </div>

      {/* Right column — card */}
      <div className="flex flex-col gap-4 border border-border bg-card p-6 md:col-span-9 md:p-8">
        {/* Logo + role + type badge */}
        <div className="flex items-start gap-3">
          {logo?.asset?.url && (
            <div className="mt-0.5 shrink-0">
              <Image
                src={logo.asset.url}
                alt={logo.alt ?? company}
                width={36}
                height={36}
                className="rounded object-contain"
              />
            </div>
          )}
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-space-grotesk font-bold text-xl leading-tight tracking-tight text-foreground md:text-2xl">
                {role}
              </h2>
              <span className="border border-border px-2 py-0.5 font-ibm-plex-mono text-xs uppercase tracking-widest text-muted-foreground">
                {TYPE_LABELS[type]}
              </span>
            </div>
            {webUrl ? (
              <a
                href={webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ibm-plex-mono text-sm uppercase tracking-wide text-[#ff7162] hover:underline"
              >
                {company}
              </a>
            ) : (
              <span className="font-ibm-plex-mono text-sm uppercase tracking-wide text-[#ff7162]">
                {company}
              </span>
            )}
          </div>
        </div>

        {description && description.length > 0 && (
          <div className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert">
            <RenderBodyContent value={description} />
          </div>
        )}

        {techStack && techStack.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
            {techStack.map((tech, i) => (
              <li key={`${tech}-${i}`}>
                <TechTag label={tech} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
