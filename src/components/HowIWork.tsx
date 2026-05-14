const cells = [
  {
    number: '01',
    title: 'Discovery first',
    body: 'Before a line of code, we figure out what you actually need vs. what the requirements doc says. Half the time, the right move is building less.',
    tag: 'Saves: weeks of rebuilds',
  },
  {
    number: '02',
    title: 'Solo or embedded',
    body: 'End-to-end on small projects (idea → production, one person). Or plug in as a senior IC on bigger teams — Slack, Jira, GitHub, async-first.',
    tag: 'Modes: lead · embed',
  },
  {
    number: '03',
    title: 'You own everything',
    body: 'Repo, infra, env vars, domain, deploys — all in your name from day one. When the project ends, you can walk away or hire anyone to continue.',
    tag: 'Ownership: 100% yours',
  },
]

export function HowIWork() {
  return (
    <section className="py-16 md:py-24">
      <div className="mb-8">
        <p className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-green-600 dark:text-ink-accent mb-3">
          / How I work
        </p>
        <h2 className="font-vin-pro-mono font-bold text-[22px] text-foreground dark:text-white leading-snug">
          Three things you get
          <br />
          that an agency won&apos;t promise.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border border-border dark:border-ink-border">
        {cells.map((cell, i) => (
          <div
            key={cell.number}
            className={`flex flex-col p-6 md:p-8 transition-colors hover:bg-muted dark:hover:bg-ink-surface ${
              i < cells.length - 1
                ? 'border-b border-border dark:border-ink-border md:border-b-0 md:border-r'
                : ''
            }`}
          >
            <p className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-muted-foreground dark:text-ink-muted mb-4">
              {cell.number} / {cell.title}
            </p>
            <p className="text-[14px] text-foreground dark:text-ink-text leading-relaxed flex-1 mb-6">
              {cell.body}
            </p>
            <p className="font-vin-pro-mono text-[10.5px] text-muted-foreground dark:text-ink-muted border-t border-border dark:border-ink-border pt-3">
              {cell.tag}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
