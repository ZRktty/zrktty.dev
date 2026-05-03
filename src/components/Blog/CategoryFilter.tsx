'use client'

const ALL_LABEL = 'ALL SYSTEMS'
const IBM_MONO = 'font-[family-name:var(--font-ibm-plex-mono)]'

interface Props {
  categories: string[]
  active: string
  onChange: (category: string) => void
}

export default function CategoryFilter({ categories, active, onChange }: Props) {
  const options = [ALL_LABEL, ...categories]

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((cat) => {
        const isActive = active === cat
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`${IBM_MONO} px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded-none transition-colors duration-150 ${
              isActive
                ? 'bg-foreground text-background'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}

export { ALL_LABEL }
