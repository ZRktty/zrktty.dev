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
      className="flex items-center justify-between mt-12 pt-8 border-t border-border"
      aria-label="Pagination"
    >
      <div>
        {hasPrev && (
          <Link
            href={`/projects?page=${currentPage - 1}`}
            className="font-mono text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Previous
          </Link>
        )}
      </div>
      <span className="font-mono text-xs text-muted-foreground">
        {currentPage} / {totalPages}
      </span>
      <div>
        {hasNext && (
          <Link
            href={`/projects?page=${currentPage + 1}`}
            className="font-mono text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Next →
          </Link>
        )}
      </div>
    </nav>
  )
}
