import { AboutPageData } from '@/types'

interface Props {
  beliefs: NonNullable<AboutPageData['beliefs']>
}

export function Beliefs({ beliefs }: Props) {
  if (beliefs.length === 0) return null

  return (
    <section className="py-16 md:py-24 border-t border-border dark:border-ink-border">
      <div className="mb-10">
        <p className="font-jetbrains-mono text-[11px] uppercase tracking-widest text-green-600 dark:text-ink-accent mb-3">
          / What I believe about software
        </p>
        {/* TODO(zoli): review every belief in Sanity Studio, cut at least two — right number is 5–6 */}
        <h2 className="font-jetbrains-mono font-bold text-[22px] text-foreground dark:text-white leading-snug">
          Opinions, briefly held but firmly stated.
        </h2>
      </div>

      <div className="flex flex-col gap-8 max-w-[640px]">
        {beliefs.map((b, i) => (
          <div key={i}>
            <p className="font-jetbrains-mono text-[15px] font-bold text-foreground dark:text-white mb-2">
              <span className="text-muted-foreground dark:text-ink-dim mr-3">
                {String(i + 1).padStart(2, '0')}.
              </span>
              {b.claim}
            </p>
            <p className="text-[14px] text-muted-foreground dark:text-ink-muted leading-relaxed pl-8">
              {b.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
