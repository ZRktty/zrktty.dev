import Image from 'next/image'
import { AboutPageData } from '@/types'
import { AvailabilityBadge } from './AvailabilityBadge'

interface Props {
  data: Pick<AboutPageData, 'authorBio' | 'metaStrip' | 'photo' | 'availability'>
}

export function AboutHero({ data }: Props) {
  const photoUrl = data.photo?.asset?.url
  const photoAlt = data.photo?.alt ?? 'Zoltán Rakottyai'

  return (
    <section className="py-16 md:py-24">
      <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-10 gap-10">
        <div className="flex-1">
          <p className="font-jetbrains-mono text-[11px] uppercase tracking-widest text-green-600 dark:text-ink-accent mb-4">
            / About
          </p>
          <h1 className="font-jetbrains-mono font-bold text-[32px] md:text-[48px] leading-[1.05] text-foreground dark:text-white mb-8">
            Hi, I&apos;m Zoltán.
          </h1>

          {data.authorBio && data.authorBio.length > 0 ? (
            data.authorBio
              .filter((b) => b.text.trim())
              .map((block, i) => (
                <p
                  key={i}
                  className="text-[16px] text-foreground dark:text-ink-text leading-relaxed mb-4 max-w-[540px]"
                >
                  {block.text}
                </p>
              ))
          ) : (
            <p className="text-[14px] text-muted-foreground dark:text-ink-muted mb-4">
              Bio not yet set.
            </p>
          )}

          <div className="flex flex-col gap-3 mt-6">
            {data.metaStrip && (
              <p className="font-jetbrains-mono text-[11px] uppercase tracking-widest text-muted-foreground dark:text-ink-muted">
                {data.metaStrip}
              </p>
            )}
            {data.availability && <AvailabilityBadge status={data.availability} />}
          </div>
        </div>

        {photoUrl && (
          <div className="md:w-[336px] md:shrink-0">
            <Image
              src={photoUrl}
              alt={photoAlt}
              width={336}
              height={960}
              className="w-full md:w-[336px] object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
