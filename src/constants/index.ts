// Shared constants for zrktty.dev
// Magic numbers and strings that appear in more than one place,
// or that benefit from a named reference, are defined here.

/** Dimensions for blog post cover images (used in the Sanity URL builder and the Image component) */
export const POST_COVER_IMAGE_WIDTH = 550
export const POST_COVER_IMAGE_HEIGHT = 310

/** Shared dimensions for full-width hero images (blog post detail and featured project) */
export const HERO_IMAGE_WIDTH = 1400
export const HERO_IMAGE_HEIGHT = 700

/** Average reading speed used to estimate blog post read time */
export const WORDS_PER_MINUTE = 200

/** Dimensions for project card thumbnails */
export const PROJECT_CARD_IMAGE_WIDTH = 800
export const PROJECT_CARD_IMAGE_HEIGHT = 450

/** Number of projects shown per page on /projects */
export const PROJECTS_PAGE_SIZE = 10

/** Number of blog posts revealed per "Load Archive" click on /blog */
export const BLOG_PAGE_SIZE = 10

/** Site-wide navigation items — single source of truth for header and mobile menu */
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Experience', href: '/experience' },
  { label: 'About me', href: '/about' },
] as const
