import localFont from 'next/font/local'
import { IBM_Plex_Sans } from 'next/font/google'

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

export const vinProMono = localFont({
  src: [
    {
      path: '../fonts/vinProMono/VinMonoPro-Light.ttf',
      weight: '300',
      style: 'light',
    },
    {
      path: '../fonts/vinProMono/VinMonoPro-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/vinProMono/VinMonoPro-Bold.ttf',
      weight: '700',
      style: 'Bold',
    },
  ],
  variable: '--font-vin-pro-mono',
})

export const ibmPLexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
})
