import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface SimilarPostNavProps {
  title: string
  slug: string
}

export function SimilarPostNav({ title, slug }: SimilarPostNavProps) {
  return (
    <div className="border-t border-border pt-12 md:pt-16">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-3">
          <span className="font-ibm-plex-mono text-xs tracking-widest uppercase text-muted-foreground">
            Read Next
          </span>
          <h2 className="font-vin-pro-mono font-bold text-3xl md:text-5xl text-foreground tracking-tight uppercase">
            {title}
          </h2>
        </div>
        <Link
          href={`/blog/${slug}`}
          aria-label={`Read next post: ${title}`}
          className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-muted hover:bg-muted/80 transition-colors shrink-0"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}
