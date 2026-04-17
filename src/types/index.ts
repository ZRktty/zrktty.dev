// Shared TypeScript types for zrktty.dev
// Component-specific types stay in their component files;
// types used across multiple files or derived from external data live here.

/** A social link entry as stored in src/data/socialLinks.json */
export interface SocialLink {
  name: string
  url: string
  color: string
}
