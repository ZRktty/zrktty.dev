import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import { codersCrux, ibmPLexSans, ibmPlexMono, jetBrainsMono, spaceGrotesk } from '@/app/fonts'

export const metadata: Metadata = {
  title: 'Zoltan Rakottyai - Software Engineer & Web Developer',
  description: 'Personal website of Zoltan Rakottyai',
}

// ${jetBrainsMono.className} `${ibmPLexSans.variable}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ibmPLexSans.variable} ${ibmPlexMono.variable} ${jetBrainsMono.variable} ${codersCrux.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
