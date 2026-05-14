import localFont from 'next/font/local'
import { IBM_Plex_Sans, IBM_Plex_Mono, JetBrains_Mono, Space_Grotesk } from 'next/font/google'

// todo: Crux  still not working, need to fix it
export const codersCrux = localFont({
  src: [
    {
      path: '../fonts/coders-crux.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-coders-crux',
})

// VinProMono (paid) is preserved in src/fonts/vinProMono/ for future restore once licensed
export const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-jetbrains-mono',
})

export const ibmPLexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
})

export const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

export const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})
