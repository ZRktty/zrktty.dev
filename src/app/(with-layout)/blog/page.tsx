import { client } from '@/sanity/client'
import { POSTS_QUERY, BLOG_CATEGORIES_QUERY } from '@/sanity/queries'
import type { PostListItem } from '@/types'
import BlogArchiveClient from '@/components/Blog/BlogArchiveClient'

const IBM_MONO = 'font-[family-name:var(--font-ibm-plex-mono)]'

const options = { next: { revalidate: 30 } }

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    client.fetch<PostListItem[]>(POSTS_QUERY, {}, options),
    client.fetch<string[]>(BLOG_CATEGORIES_QUERY, {}, options),
  ])

  return (
    <main className="container mx-auto min-h-screen max-w-6xl px-4 md:px-6 py-12 md:py-16">
      <div className="mb-12 md:mb-16">
        <h1 className="font-vin-pro-mono text-5xl md:text-7xl font-bold uppercase tracking-tight text-foreground mb-4">
          TRANSMISSIONS
        </h1>
        <p className={`${IBM_MONO} text-base text-muted-foreground max-w-xl`}>
          Thoughts, tutorials, and engineering deep dives from the terminal to the canvas.
        </p>
      </div>

      <BlogArchiveClient posts={posts} categories={categories ?? []} />
    </main>
  )
}
