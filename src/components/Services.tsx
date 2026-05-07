import { client } from '@/sanity/client'
import { SERVICES_QUERY } from '@/sanity/queries'
import { ServiceItem } from '@/types'

const options = { next: { revalidate: 60 } }

function StackList({ items }: { items: string[] }) {
  return (
    <div className="font-vin-pro-mono text-[10.5px] text-muted-foreground dark:text-ink-muted flex flex-wrap gap-x-2.5">
      {items.map((item, i) => (
        <span key={item}>
          {item}
          {i < items.length - 1 && (
            <span className="ml-2.5 text-border dark:text-ink-border-strong">·</span>
          )}
        </span>
      ))}
    </div>
  )
}

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <div className="flex flex-col p-6 md:p-8 border-b border-r border-border dark:border-ink-border transition-colors hover:bg-muted dark:hover:bg-ink-surface">
      {service.category && (
        <p className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-green-600 dark:text-ink-accent mb-3">
          {service.category}
        </p>
      )}
      <h3 className="font-vin-pro-mono font-bold text-[15px] text-foreground dark:text-white leading-snug mb-4">
        {service.title}
      </h3>
      {service.bullets && service.bullets.length > 0 && (
        <ul className="flex-1 flex flex-col gap-1.5 mb-5">
          {service.bullets.map((bullet) => (
            <li
              key={bullet}
              className="text-[13px] text-muted-foreground dark:text-ink-muted leading-relaxed pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-ink-dim"
            >
              {bullet}
            </li>
          ))}
        </ul>
      )}
      {service.stack && service.stack.length > 0 && (
        <div className="mt-auto pt-4 border-t border-border dark:border-ink-border">
          <StackList items={service.stack} />
        </div>
      )}
    </div>
  )
}

function E2ERow({ service }: { service: ServiceItem }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 md:p-8 border border-border dark:border-ink-border transition-colors hover:bg-muted dark:hover:bg-ink-surface">
      <div>
        <p className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-green-600 dark:text-ink-accent mb-2">
          End-to-end
        </p>
        <h3 className="font-vin-pro-mono font-bold text-[17px] text-foreground dark:text-white leading-snug">
          {service.title}
        </h3>
        {service.description && (
          <p className="text-[13px] text-muted-foreground dark:text-ink-muted mt-1">
            {service.description}
          </p>
        )}
      </div>
      {service.steps && service.steps.length > 0 && (
        <div className="flex flex-wrap gap-2 md:shrink-0">
          {service.steps.map((step) => (
            <span
              key={step}
              className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-muted-foreground dark:text-ink-muted border border-border dark:border-ink-border px-3 py-1"
            >
              {step}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export async function Services() {
  const services = await client.fetch<ServiceItem[]>(SERVICES_QUERY, {}, options)

  if (services.length === 0) return null

  const cards = services.filter((s) => !s.isE2E)
  const e2e = services.find((s) => s.isE2E)

  return (
    <section className="py-16 md:py-24">
      <div className="mb-10">
        <p className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-green-600 dark:text-ink-accent mb-3">
          / Services
        </p>
        <h2 className="font-vin-pro-mono font-bold text-[22px] text-foreground dark:text-white leading-snug">
          What I can do for you.
        </h2>
        <p className="text-[14px] text-muted-foreground dark:text-ink-muted mt-1">
          From backend APIs to polished UIs — choose how you want to work with me.
        </p>
      </div>

      {cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border dark:border-ink-border mb-0">
          {cards.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}

      {e2e && (
        <div className={cards.length > 0 ? 'border-t-0' : ''}>
          <E2ERow service={e2e} />
        </div>
      )}
    </section>
  )
}
