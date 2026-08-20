import { HeroCtaButtons } from '@/components/HeroCtaButtons'
import { client } from '@/sanity/client'
import { BOOKING_QUERY } from '@/sanity/queries'

const options = { next: { revalidate: 86400 } }

export async function Hero() {
  const data = await client.fetch<{ bookingUrl?: string | null }>(BOOKING_QUERY, {}, options)
  const bookingUrl = data?.bookingUrl ?? null

  return (
    <section className="flex flex-col justify-center min-h-[calc(100vh-3.5rem)]">
      <p className="font-jetbrains-mono text-[11px] uppercase tracking-widest text-muted-foreground dark:text-ink-muted mb-6">
        Software engineer · Building since 2009 · Gran Canaria, ES
      </p>

      <h1 className="font-jetbrains-mono font-bold text-[32px] md:text-[48px] leading-[1.05] mb-8">
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

      <HeroCtaButtons bookingUrl={bookingUrl} />
    </section>
  )
}

export default Hero
