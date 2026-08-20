// Shared CTA styling. Both variants appear on the hero, the about page, and the contact
// sheet trigger — they live here so a design tweak lands in one place instead of five.

// TODO(a11y): bg-green-600 with white text fails WCAG AA — consider green-700/green-800 in light mode
export const CTA_SOLID_CLASSES =
  'inline-flex items-center justify-center px-6 py-3 bg-green-600 dark:bg-ink-accent text-white dark:text-ink-bg font-jetbrains-mono font-bold text-sm rounded-none transition-opacity hover:opacity-90'

export const CTA_OUTLINE_CLASSES =
  'inline-flex items-center justify-center px-6 py-3 border border-foreground dark:border-white text-foreground dark:text-white font-jetbrains-mono text-sm rounded-none transition-colors hover:border-green-600 hover:text-green-600 dark:hover:border-ink-accent dark:hover:text-ink-accent'
