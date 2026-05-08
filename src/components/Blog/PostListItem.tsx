import Link from 'next/link'
import type { BlogPost } from '@/types'
import { formatPostDate } from '@/sanity/utils'

interface Props {
  post: BlogPost
  index: number
}

const IBM_MONO = 'font-ibm-plex-mono'

export default function PostListItem({ post, index }: Props) {
  const entryNumber = String(index + 1).padStart(2, '0')
  const firstCategory = post.categories?.[0]?.title ?? null
  const href = `/blog/${post.slug.current}`

  return (
    <Link
      href={href}
      className="group block border-t border-border dark:border-ink-border hover:bg-muted dark:hover:bg-ink-surface transition-colors duration-150"
    >
      <div className="py-8 px-2 flex flex-col gap-3 md:grid md:grid-cols-[200px_1fr] md:gap-12 md:items-start">
        {/* Left column — entry meta */}
        <div className="flex flex-row items-baseline gap-3 md:flex-col md:gap-0 md:pt-1">
          <span
            className={`${IBM_MONO} text-sm font-bold uppercase tracking-widest text-green-600 dark:text-ink-accent`}
          >
            {entryNumber}
          </span>
          {post.publishedAt && (
            <span
              className={`${IBM_MONO} text-sm uppercase tracking-widest text-muted-foreground dark:text-ink-muted`}
            >
              {formatPostDate(post.publishedAt).toUpperCase()}
            </span>
          )}
          <span className="hidden md:block md:flex-1" />
          {firstCategory && (
            <span
              className={`hidden md:block ${IBM_MONO} text-xs uppercase tracking-widest text-green-600 dark:text-ink-accent md:mt-8`}
            >
              {firstCategory}
            </span>
          )}
        </div>

        {/* Right column — title + excerpt */}
        <div className="flex flex-col gap-3">
          {firstCategory && (
            <span
              className={`${IBM_MONO} text-xs uppercase tracking-widest text-green-600 dark:text-ink-accent md:hidden`}
            >
              {firstCategory}
            </span>
          )}
          <h2 className="font-vin-pro-mono text-2xl md:text-4xl font-bold uppercase tracking-tight text-foreground dark:text-white leading-tight">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-base text-muted-foreground dark:text-ink-muted leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
