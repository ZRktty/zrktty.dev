import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Zoltan Rakottyai - Software Engineer & Web Developer',
  description: 'Personal website of Zoltan Rakottyai',
}

// ${vinProMono.className} `${ibmPLexSans.variable}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <div className="relative z-10 bg-background pt-14 px-4 md:px-8">{children}</div>
      <Footer />
    </>
  )
}
