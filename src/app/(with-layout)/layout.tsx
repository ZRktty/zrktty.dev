import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MobileNavProvider } from '@/components/mobile-nav'
import { client } from '@/sanity/client'
import { AVAILABILITY_QUERY } from '@/sanity/queries'

export const metadata: Metadata = {
  title: 'Zoltan Rakottyai - Software Engineer & Web Developer',
  description: 'Personal website of Zoltan Rakottyai',
}

// ${jetBrainsMono.className} `${ibmPLexSans.variable}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const data = await client.fetch<{
    availability: string | null
    socialLinks?: Array<{ platform: string; url: string }>
  }>(AVAILABILITY_QUERY, {}, { next: { revalidate: 86400 } })

  return (
    <MobileNavProvider>
      <Header availability={data?.availability ?? null} />
      <div className="relative z-10 bg-background pt-14 px-4 md:px-8">{children}</div>
      <Footer links={data?.socialLinks} />
    </MobileNavProvider>
  )
}
