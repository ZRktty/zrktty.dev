'use client'

import { useState } from 'react'
import type { BlogPost } from '@/types'
import { BLOG_PAGE_SIZE } from '@/constants'
import CategoryFilter, { ALL_LABEL } from './CategoryFilter'
import PostListItem from './PostListItem'

const IBM_MONO = 'font-ibm-plex-mono'

interface Props {
  posts: BlogPost[]
  categories: Array<{ _id: string; title: string }>
}

export default function BlogArchiveClient({ posts, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState(ALL_LABEL)
  const [visibleCount, setVisibleCount] = useState(BLOG_PAGE_SIZE)

  const filtered =
    activeCategory === ALL_LABEL
      ? posts
      : posts.filter((p) => p.categories?.some((c) => c._id === activeCategory))

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat)
    setVisibleCount(BLOG_PAGE_SIZE)
  }

  return (
    <div className="flex flex-col gap-10">
      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onChange={handleCategoryChange}
      />

      <div className="flex flex-col">
        {visible.length > 0 ? (
          visible.map((post, i) => <PostListItem key={post._id} post={post} index={i} />)
        ) : (
          <p className={`${IBM_MONO} text-muted-foreground dark:text-ink-muted text-sm py-12`}>
            No transmissions found.
          </p>
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-8 border-t border-border dark:border-ink-border">
          <button
            type="button"
            onClick={() => setVisibleCount((n) => n + BLOG_PAGE_SIZE)}
            className={`${IBM_MONO} px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-green-600 dark:text-ink-accent border border-border dark:border-ink-border rounded-none hover:bg-muted dark:hover:bg-ink-surface transition-colors duration-150`}
          >
            LOAD ARCHIVE
          </button>
        </div>
      )}
    </div>
  )
}
