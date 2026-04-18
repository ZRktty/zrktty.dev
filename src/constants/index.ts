// Shared constants for zrktty.dev
// Magic numbers and strings that appear in more than one place,
// or that benefit from a named reference, are defined here.

/** Dimensions for blog post cover images (used in the Sanity URL builder and the Image component) */
export const POST_COVER_IMAGE_WIDTH = 550
export const POST_COVER_IMAGE_HEIGHT = 310

/** Dimensions for project card thumbnails */
export const PROJECT_CARD_IMAGE_WIDTH = 800
export const PROJECT_CARD_IMAGE_HEIGHT = 450

/** Dimensions for the full-width featured project card */
export const PROJECT_FEATURED_IMAGE_WIDTH = 1400
export const PROJECT_FEATURED_IMAGE_HEIGHT = 700

/** Site-wide navigation items — single source of truth for header and mobile menu */
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Experience', href: '/experience' },
  { label: 'About me', href: '/about' },
] as const
