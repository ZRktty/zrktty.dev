import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import {
  POST_DETAIL_QUERY,
  POST_SLUGS_QUERY,
  SIMILAR_POSTS_BY_CATEGORY_QUERY,
} from '@/sanity/queries'
import { urlFor, estimateReadTime, formatPostDate } from '@/sanity/utils'
import { RenderBodyContent } from '@/components/RenderBodyContent'
import { TechTag } from '@/components/projects/TechTag'
import { SimilarPostNav } from '@/components/Blog/SimilarPostNav'
import { HERO_IMAGE_WIDTH, HERO_IMAGE_HEIGHT } from '@/constants'
import type { BlogPostDetail, BlogPostSimilar } from '@/types'

const fetchOptions = { next: { revalidate: 60 } }

const AUTHOR_AVATAR_SIZE = 40

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(POST_SLUGS_QUERY)
  return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch<BlogPostDetail | null>(POST_DETAIL_QUERY, { slug }, fetchOptions)
  if (!post) return {}
  return { title: post.title }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await client.fetch<BlogPostDetail | null>(POST_DETAIL_QUERY, { slug }, fetchOptions)

  if (!post) notFound()

  const heroUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(HERO_IMAGE_WIDTH).height(HERO_IMAGE_HEIGHT).url()
    : null

  const readTime = estimateReadTime(post.body)

  let similarPost: BlogPostSimilar | null = post.similarPost ?? null
  if (!similarPost && post.categories && post.categories.length > 0) {
    similarPost = await client.fetch<BlogPostSimilar | null>(
      SIMILAR_POSTS_BY_CATEGORY_QUERY,
      { excludeId: post._id, categoryIds: post.categories.map((c) => c._id) },
      fetchOptions,
    )
  }

  const avatarSrc = post.author?.image?.asset?.url
  const authorAvatarUrl = avatarSrc
    ? `${avatarSrc}?w=${AUTHOR_AVATAR_SIZE * 2}&h=${AUTHOR_AVATAR_SIZE * 2}&fit=crop&auto=format`
    : null

  return (
    <main className="container mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
      {/* Hero */}
      <section className="flex flex-col gap-8 mb-12 md:mb-16">
        <div className="flex flex-col gap-4">
          <span className="font-ibm-plex-mono text-xs tracking-widest uppercase text-[#E53935]">
            Article
          </span>
          <h1 className="font-vin-pro-mono font-bold text-4xl md:text-6xl text-foreground tracking-tight uppercase">
            {post.title}
          </h1>
        </div>
        {/* TODO OPxV: container uses aspect-video (16:9) but hero is requested at 1400×700 (2:1) — fix to aspect-[2/1] or adjust image dimensions to 16:9 */}
        {heroUrl && (
          <div className="relative w-full aspect-video overflow-hidden bg-muted">
            <Image
              src={heroUrl}
              alt={post.title ? `${post.title} cover image` : 'Article cover image'}
              fill
              priority
              className="object-cover"
              sizes={`(max-width: 768px) 100vw, ${HERO_IMAGE_WIDTH}px`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}
      </section>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-24">
        {/* Sidebar */}
        <aside className="md:col-span-3 flex flex-col gap-8">
          {post.author?.name && (
            <div className="flex flex-col gap-2">
              <span className="font-ibm-plex-mono text-xs tracking-widest uppercase text-muted-foreground">
                Author
              </span>
              <div className="flex items-center gap-3">
                {authorAvatarUrl && (
                  <Image
                    src={authorAvatarUrl}
                    alt={post.author.name}
                    width={AUTHOR_AVATAR_SIZE}
                    height={AUTHOR_AVATAR_SIZE}
                    className="rounded-full object-cover shrink-0"
                  />
                )}
                <span className="font-ibm-plex-mono text-sm text-foreground">
                  {post.author.name}
                </span>
              </div>
            </div>
          )}
          {post.publishedAt && (
            <div className="flex flex-col gap-2">
              <span className="font-ibm-plex-mono text-xs tracking-widest uppercase text-muted-foreground">
                Published On
              </span>
              <span className="font-ibm-plex-mono text-sm text-foreground">
                {formatPostDate(post.publishedAt)}
              </span>
            </div>
          )}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="font-ibm-plex-mono text-xs tracking-widest uppercase text-muted-foreground">
                Categories
              </span>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <TechTag key={cat._id} label={cat.title} />
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <span className="font-ibm-plex-mono text-xs tracking-widest uppercase text-muted-foreground">
              Read Time
            </span>
            <span className="font-ibm-plex-mono text-sm text-foreground">
              {readTime > 0 ? `${readTime} min read` : '🙈'}
            </span>
          </div>
          <Link
            href="/blog"
            className="font-ibm-plex-mono text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            ← All Posts
          </Link>
        </aside>

        {/* Body */}
        <article className="md:col-span-9 prose prose-neutral dark:prose-invert max-w-none">
          {post.body && <RenderBodyContent value={post.body} />}
        </article>
      </div>

      {/* Similar post */}
      {similarPost?.slug && <SimilarPostNav title={similarPost.title} slug={similarPost.slug} />}
    </main>
  )
}
