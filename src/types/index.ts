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

/** Shape returned by ABOUT_QUERY */
export interface AboutPageData {
  name: string
  metaStrip?: string
  photo?: { asset: { url: string }; alt?: string } | null
  availability?: string
  bookingUrl?: string | null
  cvFile?: { asset: { url: string; originalFilename?: string } } | null
  socialLinks?: Array<{ platform: string; url: string }>
  authorBio?: Array<{ text: string }>
  beliefs?: Array<{ claim: string; body: string }>
  toolkitRows?: Array<{ category: string; tools: string }>
  testimonials?: Array<{ text: string; attribution: string; role: string; year: string }>
  outsideBlocks?: Array<{ title: string; body: string }>
  externalLinks?: Array<{ label: string; url: string }>
}

/** Shape returned by SERVICES_QUERY */
export interface ServiceItem {
  _id: string
  category?: string
  title: string
  description?: string
  bullets?: string[]
  stack?: string[]
  steps?: string[]
  isE2E?: boolean
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
  slug: string
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
  author: {
    name: string
    // TODO OPxQ: asset should be optional/nullable — image.asset can be null when Sanity image ref exists without an uploaded asset
    image?: { asset: { url: string } } | null
  } | null
  categories: Array<{ _id: string; title: string }> | null
  similarPost?: BlogPostSimilar | null
}
