// Shared TypeScript types for zrktty.dev
// Component-specific types stay in their component files;
// types used across multiple files or derived from external data live here.

/** A social link entry as stored in src/data/socialLinks.json */
export interface SocialLink {
  name: string
  url: string
  color: string
}

export type ExperienceType = 'fulltime' | 'freelance' | 'contract'

/** Shape returned by EXPERIENCE_QUERY — logo asset is resolved via -> */
export interface ExperienceItem {
  _id: string
  company: string
  role: string
  webUrl?: string
  type: ExperienceType
  startDate: string
  endDate?: string | null
  description?: import('@/sanity/types').BlockContent
  techStack?: string[]
  logo?: {
    asset: { url: string }
    alt?: string
  } | null
  order?: number
}

/** Minimal shape returned by NEXT_PROJECT_QUERY */
export interface NextProjectRef {
  title: string
  slug: { current: string }
}

/** Shape returned by POSTS_QUERY — includes resolved categories and computed excerpt */
export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string | null
  categories: Array<{ _id: string; title: string }> | null
  excerpt: string
}

/** Minimal blog post shape used in the "Read Next" similar-post block */
export interface BlogPostSimilar {
  title: string
  slug: { current: string }
  publishedAt: string | null
  categories: Array<{ _id: string; title: string }> | null
  mainImage?: import('@/sanity/types').Post['mainImage']
}

/** Full shape returned by POST_DETAIL_QUERY — used on the blog post detail page */
export interface BlogPostDetail {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string | null
  mainImage?: import('@/sanity/types').Post['mainImage']
  body?: import('@/sanity/types').BlockContent
  author: { name: string } | null
  categories: Array<{ _id: string; title: string }> | null
  similarPost?: BlogPostSimilar | null
}
