'use client'

import { useState } from 'react'
import type { PostListItem } from '@/types'
import { BLOG_PAGE_SIZE } from '@/constants'
import CategoryFilter, { ALL_LABEL } from './CategoryFilter'
import PostListItemComponent from './PostListItem'

const IBM_MONO = 'font-ibm-plex-mono'

interface Props {
  posts: PostListItem[]
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
          visible.map((post, i) => <PostListItemComponent key={post._id} post={post} index={i} />)
        ) : (
          <p className={`${IBM_MONO} text-muted-foreground text-sm py-12`}>
            No transmissions found.
          </p>
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-8 border-t border-border">
          <button
            type="button"
            onClick={() => setVisibleCount((n) => n + BLOG_PAGE_SIZE)}
            className={`${IBM_MONO} px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#0052FF] border border-border rounded-none hover:bg-accent transition-colors duration-150`}
          >
            LOAD ARCHIVE
          </button>
        </div>
      )}
    </div>
  )
}
