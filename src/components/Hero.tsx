import Link from 'next/link'

export function Hero() {
  return (
    <section className="flex flex-col justify-center min-h-[80vh] py-20 md:py-0">
      <p className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-muted-foreground dark:text-ink-muted mb-6">
        Software engineer · Building since 2009 · Gran Canaria, ES
      </p>

      <h1 className="font-vin-pro-mono font-bold text-[32px] md:text-[48px] leading-[1.05] mb-8">
        <span className="text-foreground dark:text-white block">Most projects don&apos;t fail</span>
        <span className="text-foreground dark:text-white block">because the code is bad.</span>
        <span className="text-green-600 dark:text-ink-accent block">
          They fail before any code is written.
        </span>
      </h1>

      <p className="text-[17px] text-foreground dark:text-ink-text leading-relaxed max-w-[540px] mb-4">
        I&apos;m <span className="text-foreground dark:text-white font-medium">Zoltán</span>
        {' — '}the engineer founders bring in when they need someone who&apos;ll{' '}
        <span className="text-foreground dark:text-white font-medium">push back on the spec</span>,
        not just execute it.
      </p>

      <p className="text-[15px] text-muted-foreground dark:text-ink-dim leading-relaxed max-w-[540px] mb-10">
        Sixteen years shipping web apps with Node.js, Next.js, and good judgment. Solo on small
        bets, embedded on bigger ones. Either way, I deliver working products — not tickets closed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="https://calendly.com/zoltanrakottyai/1on1-meeting"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-ink-accent text-ink-bg font-vin-pro-mono font-bold text-sm rounded-none transition-opacity hover:opacity-90"
        >
          Book a 30-min call →
        </Link>
        <a
          href="#featured-projects"
          className="inline-flex items-center justify-center px-6 py-3 border border-foreground dark:border-white text-foreground dark:text-white font-vin-pro-mono text-sm rounded-none transition-colors hover:border-green-600 hover:text-green-600 dark:hover:border-ink-accent dark:hover:text-ink-accent"
        >
          See recent work
        </a>
      </div>
    </section>
  )
}

export default Hero
