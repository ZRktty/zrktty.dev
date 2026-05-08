// TODO(zoli): Replace with real testimonial within 2 weeks.
// Email last 3 clients with: "Quick favor — would you write 1–2 sentences
// about working together? Here's a draft you can edit: ..."

export function Testimonial() {
  return (
    <section className="py-16 md:py-24 bg-muted dark:bg-[#0A0A0A]">
      <blockquote className="max-w-[580px]">
        <p className="font-vin-pro-mono text-[17px] text-foreground dark:text-white leading-relaxed mb-8">
          &ldquo;Zoltán didn&apos;t just build what we asked for — he caught two scope mistakes in
          the first call that would have cost us a month. Rare to find.&rdquo;
        </p>
        <footer className="flex items-center gap-3">
          <span className="text-ink-accent font-vin-pro-mono text-[13px]">— [Client name]</span>
          <span className="font-vin-pro-mono text-[11.5px] uppercase tracking-widest text-muted-foreground dark:text-ink-muted">
            CTO, [Company] · 2025
          </span>
        </footer>
      </blockquote>
    </section>
  )
}
