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

function DateRange({ startDate, endDate }: { startDate: string; endDate?: string | null }) {
  return (
    <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-muted-foreground">
      {formatDate(startDate)} — {endDate ? formatDate(endDate) : 'Present'}
    </span>
  )
}

interface Props {
  item: ExperienceItem
}

export function ExperienceCard({ item }: Props) {
  const { company, role, webUrl, type, startDate, endDate, description, techStack, logo } = item

  return (
    <article className="flex flex-col gap-3 border border-border bg-card p-4 md:p-6">
      <div className="flex items-start gap-4">
        {logo?.asset?.url && (
          <div className="shrink-0">
            <Image
              src={logo.asset.url}
              alt={logo.alt ?? company}
              width={40}
              height={40}
              className="rounded object-contain"
            />
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-vin-pro-mono text-base font-bold leading-tight md:text-lg">
              {role}
            </h2>
            <span className="border border-border px-2 py-0.5 font-ibm-plex-mono text-xs uppercase tracking-widest text-muted-foreground">
              {TYPE_LABELS[type]}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {webUrl ? (
              <a
                href={webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#E53935] hover:underline"
              >
                {company}
              </a>
            ) : (
              <span className="text-sm font-medium">{company}</span>
            )}
            <DateRange startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </div>

      {description && description.length > 0 && (
        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
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
    </article>
  )
}
