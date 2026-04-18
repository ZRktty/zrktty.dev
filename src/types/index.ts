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

interface SanityImageAsset {
  asset?: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface ProjectItem {
  _id: string
  title: string
  slug: { current: string }
  shortDescription?: string
  thumbnail?: SanityImageAsset
  techStack?: string[]
  featured?: boolean
  highlighted?: boolean
  order?: number
  liveUrl?: string
  githubUrl?: string
}

export interface ProjectDetail extends ProjectItem {
  client?: string
  timeline?: string
  role?: string[]
  body?: import('@/sanity/types').BlockContent
}
