import { client } from '@/sanity/client'
import { ABOUT_QUERY } from '@/sanity/queries'
import { AboutPageData } from '@/types'
import { AboutHero } from '@/components/about/AboutHero'
import { Beliefs } from '@/components/about/Beliefs'
import { Toolkit } from '@/components/about/Toolkit'
import { Testimonials } from '@/components/about/Testimonials'
import { OutsideWork } from '@/components/about/OutsideWork'
import { ContactBlock } from '@/components/about/ContactBlock'

export const metadata = {
  title: 'About — Zoltán Rakottyai',
  description:
    'Software engineer based in Gran Canaria. 16 years building web apps. Opinions, toolkit, and how to work with me.',
}

const options = { next: { revalidate: 60 } }

export default async function AboutPage() {
  const data = await client.fetch<AboutPageData | null>(ABOUT_QUERY, {}, options)

  return (
    <div className="min-h-screen bg-background dark:bg-ink-bg font-[family-name:var(--font-ibm-plex-sans)]">
      <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <AboutHero data={data ?? {}} />

        <Beliefs beliefs={data?.beliefs ?? []} />
        <Toolkit rows={data?.toolkitRows ?? []} />
        <Testimonials testimonials={data?.testimonials ?? []} />
        <OutsideWork blocks={data?.outsideBlocks ?? []} links={data?.externalLinks ?? []} />
        <ContactBlock cvFile={data?.cvFile} socialLinks={data?.socialLinks} />
      </main>
    </div>
  )
}
