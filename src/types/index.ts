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
