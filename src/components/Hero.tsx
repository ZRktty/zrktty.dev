import Image from 'next/image'
import { client } from '@/sanity/client'
import { ABOUT_ME_HERO_QUERY } from '@/sanity/queries'
import { HeroData } from '@/types'
import { ScrollDownButton } from '@/components/shared/ScrollDownButton'

const options = { next: { revalidate: 3600 } }

const FALLBACK_NAME = 'Zoltan Rakottyai'
const FALLBACK_HEADLINE = 'Software Engineer / Frontend / Backend / Full-stack'

export async function Hero() {
  const data = await client.fetch<HeroData | null>(ABOUT_ME_HERO_QUERY, {}, options)

  const name = data?.name ?? FALLBACK_NAME
  const headline = data?.headline ?? FALLBACK_HEADLINE
  const bioText = data?.bioText ?? ''

  return (
    <div className="w-full h-[calc(100vh-3.5rem)] bg-background flex items-center">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 h-full items-center">
          {/* Left column — copy */}
          <div className="flex flex-col justify-center gap-6 py-24 lg:py-0">
            <h1 className="font-vin-pro-mono font-bold text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
              {name}
            </h1>

            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-base md:text-lg text-[#E53935]">
              {headline}
            </span>

            {bioText && (
              <p className="font-[family-name:var(--font-ibm-plex-sans)] text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
                {bioText}
              </p>
            )}

            <div className="mt-4">
              <ScrollDownButton />
            </div>
          </div>

          {/* Right column — portrait */}
          <div className="hidden lg:flex items-center justify-center h-full overflow-hidden animate-fade-in">
            <Image
              src="/devPortrait.jpg"
              alt="Zoltan Rakottyai"
              width={420}
              height={560}
              priority
              className="object-contain object-bottom grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-[filter] duration-700 ease-in-out max-h-[85vh] w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
