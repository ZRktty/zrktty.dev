import Link from 'next/link'

interface PaginationNavProps {
  currentPage: number
  totalPages: number
}

export function PaginationNav({ currentPage, totalPages }: PaginationNavProps) {
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav
      className="flex items-center justify-between mt-12 pt-8 border-t border-border dark:border-ink-border"
      aria-label="Pagination"
    >
      <div>
        {hasPrev ? (
          <Link
            href={`/projects?page=${currentPage - 1}`}
            className="font-jetbrains-mono text-[11px] uppercase tracking-widest text-muted-foreground dark:text-ink-muted hover:text-green-600 dark:hover:text-ink-accent transition-colors"
          >
            ← Previous
          </Link>
        ) : (
          <span />
        )}
      </div>
      <span className="font-jetbrains-mono text-[11px] text-muted-foreground dark:text-ink-dim">
        {currentPage} / {totalPages}
      </span>
      <div>
        {hasNext && (
          <Link
            href={`/projects?page=${currentPage + 1}`}
            className="font-jetbrains-mono text-[11px] uppercase tracking-widest text-muted-foreground dark:text-ink-muted hover:text-green-600 dark:hover:text-ink-accent transition-colors"
          >
            Next →
          </Link>
        )}
      </div>
    </nav>
  )
}
