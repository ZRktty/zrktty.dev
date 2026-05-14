'use client'

const ALL_LABEL = 'ALL'
const IBM_MONO = 'font-ibm-plex-mono'

interface CategoryOption {
  _id: string
  title: string
}

interface Props {
  categories: CategoryOption[]
  active: string
  onChange: (id: string) => void
}

const PILL_BASE = `${IBM_MONO} px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded-none transition-colors duration-150`
const PILL_ACTIVE = 'bg-foreground text-background'
const PILL_INACTIVE =
  'bg-muted dark:bg-ink-surface text-muted-foreground dark:text-ink-muted hover:bg-muted/80 dark:hover:bg-ink-border hover:text-foreground dark:hover:text-white'

export default function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        aria-pressed={active === ALL_LABEL}
        onClick={() => onChange(ALL_LABEL)}
        className={`${PILL_BASE} ${active === ALL_LABEL ? PILL_ACTIVE : PILL_INACTIVE}`}
      >
        {ALL_LABEL}
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          type="button"
          aria-pressed={active === cat._id}
          onClick={() => onChange(cat._id)}
          className={`${PILL_BASE} ${active === cat._id ? PILL_ACTIVE : PILL_INACTIVE}`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  )
}

export { ALL_LABEL }
