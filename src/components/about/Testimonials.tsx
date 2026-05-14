// TODO(zoli): Replace all placeholder quotes within 2 weeks.
// Email last 3 clients with: "Quick favor — would you write
// 1–2 sentences about working together? Here's a draft you
// can edit: ..."

import { AboutPageData } from '@/types'

interface Props {
  testimonials: NonNullable<AboutPageData['testimonials']>
}

export function Testimonials({ testimonials }: Props) {
  if (testimonials.length === 0) return null

  return (
    <section className="py-16 md:py-24 border-t border-border dark:border-ink-border">
      <div className="mb-10">
        <p className="font-jetbrains-mono text-[11px] uppercase tracking-widest text-green-600 dark:text-ink-accent mb-3">
          / What collaborators say
        </p>
        <h2 className="font-jetbrains-mono font-bold text-[22px] text-foreground dark:text-white leading-snug">
          Three people I&apos;ve worked closely with, in their words.
        </h2>
      </div>

      <div className="flex flex-col gap-10 max-w-[620px]">
        {testimonials.map((q, i) => (
          <blockquote key={i} className="border-l-2 border-border dark:border-ink-border pl-6">
            <p className="font-jetbrains-mono text-[15px] text-foreground dark:text-white leading-relaxed mb-4">
              &ldquo;{q.text}&rdquo;
            </p>
            <footer className="flex flex-wrap items-center gap-2">
              <span className="font-jetbrains-mono text-[13px] text-green-600 dark:text-ink-accent">
                — {q.attribution}
              </span>
              <span className="font-jetbrains-mono text-[11px] uppercase tracking-widest text-muted-foreground dark:text-ink-muted">
                {q.role} · {q.year}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
