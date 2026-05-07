import Image from 'next/image'
import { AboutPageData } from '@/types'

interface Props {
  data: Pick<AboutPageData, 'bioParagraphs' | 'metaStrip' | 'photo'>
}

export function AboutHero({ data }: Props) {
  const photoSrc = data.photo?.asset?.url ?? '/image.png'
  const photoAlt = data.photo?.alt ?? 'Zoltán Rakottyai'

  return (
    <section className="py-16 md:py-24">
      <div className="flex flex-col-reverse md:flex-row md:items-start md:gap-16 gap-10">
        <div className="flex-1">
          <p className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-green-600 dark:text-ink-accent mb-4">
            / About
          </p>
          <h1 className="font-vin-pro-mono font-bold text-[32px] md:text-[48px] leading-[1.05] text-foreground dark:text-white mb-8">
            Hi, I&apos;m Zoltán.
          </h1>

          {data.bioParagraphs && data.bioParagraphs.length > 0 ? (
            data.bioParagraphs.map((p, i) => (
              // TODO(zoli): review wording of bio paragraphs in Sanity Studio
              <p
                key={i}
                className="text-[16px] text-foreground dark:text-ink-text leading-relaxed mb-5 max-w-[540px]"
              >
                {p}
              </p>
            ))
          ) : (
            // TODO(zoli): add bio paragraphs in Sanity Studio → About Me document
            <p className="text-[14px] text-muted-foreground dark:text-ink-muted mb-5">
              Bio not yet set.
            </p>
          )}

          {data.metaStrip && (
            <p className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-muted-foreground dark:text-ink-muted mt-6">
              {data.metaStrip}
            </p>
          )}
        </div>

        <div className="md:w-[280px] md:shrink-0">
          <Image
            src={photoSrc}
            alt={photoAlt}
            width={280}
            height={340}
            className="w-full md:w-[280px] object-cover grayscale"
            priority
            unoptimized={photoSrc.startsWith('http')}
          />
        </div>
      </div>
    </section>
  )
}
