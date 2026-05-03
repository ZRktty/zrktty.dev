import Link from 'next/link'
import type { PostListItem } from '@/types'

interface Props {
  post: PostListItem
  index: number
}

function formatDate(iso: string): string {
  return new Date(iso)
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .toUpperCase()
}

const IBM_MONO = 'font-[family-name:var(--font-ibm-plex-mono)]'

export default function PostListItem({ post, index }: Props) {
  const entryNumber = String(index + 1).padStart(2, '0')
  const firstCategory = post.categories?.[0]?.title ?? null
  const href = post.slug ? `/blog/${post.slug.current}` : '#'

  return (
    <Link
      href={href}
      className="group block border-t border-border hover:bg-accent transition-colors duration-150"
    >
      <div className="py-8 px-2 flex flex-col gap-3 md:grid md:grid-cols-[200px_1fr] md:gap-12 md:items-start">
        {/* Left column — entry meta */}
        <div className="flex flex-row items-baseline gap-3 md:flex-col md:gap-0 md:pt-1">
          <span
            className={`${IBM_MONO} text-sm font-bold uppercase tracking-widest text-[#0052FF]`}
          >
            {entryNumber}
          </span>
          {post.publishedAt && (
            <span className={`${IBM_MONO} text-sm uppercase tracking-widest text-muted-foreground`}>
              {formatDate(post.publishedAt)}
            </span>
          )}
          {/* spacer — desktop only */}
          <span className="hidden md:block md:flex-1" />
          {firstCategory && (
            <span
              className={`hidden md:block ${IBM_MONO} text-xs uppercase tracking-widest text-[#E53935] md:mt-8`}
            >
              {firstCategory}
            </span>
          )}
        </div>

        {/* Right column — title + excerpt */}
        <div className="flex flex-col gap-3">
          {firstCategory && (
            <span
              className={`${IBM_MONO} text-xs uppercase tracking-widest text-[#E53935] md:hidden`}
            >
              {firstCategory}
            </span>
          )}
          <h2 className="font-vin-pro-mono text-2xl md:text-4xl font-bold uppercase tracking-tight text-foreground leading-tight group-hover:text-foreground">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className={`${IBM_MONO} text-base text-muted-foreground leading-relaxed`}>
              {post.excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
