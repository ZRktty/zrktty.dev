import { AboutPageData } from '@/types'

interface Props {
  rows: NonNullable<AboutPageData['toolkitRows']>
}

export function Toolkit({ rows }: Props) {
  if (rows.length === 0) return null

  return (
    <section className="py-16 md:py-24 border-t border-border dark:border-ink-border">
      <div className="mb-10">
        <p className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-green-600 dark:text-ink-accent mb-3">
          / Toolkit
        </p>
        <h2 className="font-vin-pro-mono font-bold text-[22px] text-foreground dark:text-white leading-snug">
          What I reach for, and why.
        </h2>
      </div>

      <div className="flex flex-col border-t border-border dark:border-ink-border mb-8">
        {rows.map((row) => (
          <div
            key={row.category}
            className="flex flex-col md:flex-row md:gap-12 py-4 border-b border-border dark:border-ink-border"
          >
            <span className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-muted-foreground dark:text-ink-dim w-36 shrink-0 mb-1 md:mb-0">
              {row.category}
            </span>
            <span className="font-vin-pro-mono text-[13px] text-foreground dark:text-ink-text leading-relaxed">
              {row.tools}
            </span>
          </div>
        ))}
      </div>

      {/* TODO(zoli): review toolkit blurb wording */}
      <p className="text-[14px] text-muted-foreground dark:text-ink-muted leading-relaxed max-w-[540px]">
        The list is honest, not aspirational. If it&apos;s here I&apos;ve shipped real work with it
        in the last two years. The tools I&apos;ve fallen out of love with — and there are a few —
        aren&apos;t on the list.
      </p>
    </section>
  )
}
