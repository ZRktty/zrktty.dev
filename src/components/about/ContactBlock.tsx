import Link from 'next/link'
import { AboutPageData } from '@/types'
import { CVDownload } from './CVDownload'
import { AboutSocialLinks } from './AboutSocialLinks'

const fits = [
  'Solo build, end-to-end. Idea to production, one person.',
  'Embedded in your team. Senior IC for 3–6 months.',
  'Audit & advisory. One-off review of an existing codebase.',
]

const notFits = [
  'Hourly support contracts.',
  '"We just need a quick fix" emergencies.',
  "Projects that won't tell me why before what.",
]

interface Props {
  cvFile?: AboutPageData['cvFile']
  socialLinks?: AboutPageData['socialLinks']
}

export function ContactBlock({ cvFile, socialLinks }: Props) {
  return (
    <section className="py-16 md:py-24 border-t border-border dark:border-ink-border">
      <div className="mb-10">
        <p className="font-vin-pro-mono text-[11px] uppercase tracking-widest text-green-600 dark:text-ink-accent mb-3">
          / How to work with me
        </p>
        <h2 className="font-vin-pro-mono font-bold text-[22px] text-foreground dark:text-white leading-snug">
          The simplest part of the site.
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-12 max-w-[640px]">
        <div className="flex flex-col gap-3">
          {fits.map((line) => (
            <p
              key={line}
              className="font-vin-pro-mono text-[13px] text-foreground dark:text-ink-text"
            >
              <span className="text-green-600 dark:text-ink-accent mr-2">✓</span>
              {line}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {notFits.map((line) => (
            <p
              key={line}
              className="font-vin-pro-mono text-[13px] text-muted-foreground dark:text-ink-muted"
            >
              <span className="mr-2">✗</span>
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Link
          href="https://calendly.com/zoltanrakottyai/1on1-meeting"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-ink-accent text-ink-bg font-vin-pro-mono font-bold text-sm rounded-none transition-opacity hover:opacity-90"
        >
          Book a 30-min call →
        </Link>
        <a
          href="mailto:zoltanrakottyai@gmail.com"
          className="inline-flex items-center justify-center px-6 py-3 border border-foreground dark:border-white text-foreground dark:text-white font-vin-pro-mono text-sm rounded-none transition-colors hover:border-green-600 hover:text-green-600 dark:hover:border-ink-accent dark:hover:text-ink-accent"
        >
          Email me directly
        </a>
        {cvFile?.asset?.url && <CVDownload url={cvFile.asset.url} />}
      </div>

      {socialLinks && socialLinks.length > 0 && (
        <div className="mb-8">
          <AboutSocialLinks links={socialLinks} />
        </div>
      )}

      {/* TODO(zoli): review closing line wording */}
      <p className="text-[13px] text-muted-foreground dark:text-ink-dim max-w-[420px] leading-relaxed">
        Response time is usually under 24 hours, except when I&apos;m on a flight or at the beach.
        Both happen.
      </p>
    </section>
  )
}
