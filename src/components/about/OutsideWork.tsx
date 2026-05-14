import Link from 'next/link'
import { AboutPageData } from '@/types'

interface Props {
  blocks: NonNullable<AboutPageData['outsideBlocks']>
  links: NonNullable<AboutPageData['externalLinks']>
}

export function OutsideWork({ blocks, links }: Props) {
  if (blocks.length === 0) return null

  return (
    <section className="py-16 md:py-24 border-t border-border dark:border-ink-border">
      <div className="mb-10">
        <p className="font-jetbrains-mono text-[11px] uppercase tracking-widest text-green-600 dark:text-ink-accent mb-3">
          / Outside the editor
        </p>
        <h2 className="font-jetbrains-mono font-bold text-[22px] text-foreground dark:text-white leading-snug">
          What the rest of the week looks like.
        </h2>
      </div>

      {/* TODO(zoli): review all outside-work blocks in Sanity Studio */}
      <div className="flex flex-col gap-8 max-w-[580px]">
        {blocks.map((block) => (
          <div key={block.title}>
            <p className="font-jetbrains-mono text-[13px] font-bold text-foreground dark:text-white uppercase tracking-widest mb-2">
              {block.title}.
            </p>
            <p className="text-[14px] text-muted-foreground dark:text-ink-muted leading-relaxed">
              {block.body}
            </p>
          </div>
        ))}
      </div>

      {/* TODO(zoli): add 3-photo strip from Flickr */}

      {links.length > 0 && (
        <div className="flex gap-6 mt-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-jetbrains-mono text-[12px] text-muted-foreground dark:text-ink-muted hover:text-green-600 dark:hover:text-ink-accent transition-colors"
            >
              {link.label} ↗
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
