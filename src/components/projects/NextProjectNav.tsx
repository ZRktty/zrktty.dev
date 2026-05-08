import Link from 'next/link'

interface NextProjectNavProps {
  title: string
  slug: string
}

export function NextProjectNav({ title, slug }: NextProjectNavProps) {
  return (
    <div className="border-t border-border dark:border-ink-border pt-12 md:pt-16">
      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <span className="font-vin-pro-mono text-[10.5px] tracking-widest uppercase text-muted-foreground dark:text-ink-muted">
            Next Project
          </span>
          <h2 className="font-vin-pro-mono font-bold text-[26px] md:text-[36px] text-foreground dark:text-white leading-tight">
            {title}
          </h2>
        </div>
        <Link
          href={`/projects/${slug}`}
          aria-label={`View next project: ${title}`}
          className="font-vin-pro-mono text-[11px] uppercase tracking-widest shrink-0 px-5 py-3 border border-border dark:border-ink-border text-foreground dark:text-white hover:border-green-600 hover:text-green-600 dark:hover:border-ink-accent dark:hover:text-ink-accent transition-colors"
        >
          Next →
        </Link>
      </div>
    </div>
  )
}
