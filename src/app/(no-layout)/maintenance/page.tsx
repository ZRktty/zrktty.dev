import React from 'react'
import { Analytics } from '@vercel/analytics/next'
import SocialLinks from '@/components/SocialLinks'

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-lg w-full">
        <p className="font-jetbrains-mono text-[10px] md:text-[11px] uppercase tracking-widest text-gray-400 mb-6 md:mb-10">
          ERROR_503
        </p>

        <h1 className="font-jetbrains-mono font-bold text-[36px] md:text-[52px] lg:text-[72px] leading-none text-gray-900 mb-8 md:mb-12">
          SYSTEM<span className="animate-pulse text-green-600">_</span>OFFLINE
        </h1>

        <div className="mb-8 md:mb-12 flex flex-col gap-2">
          <p className="font-jetbrains-mono text-[14px] md:text-[16px] text-gray-900">
            We&apos;re Under Maintenance
          </p>
          <p className="font-ibm-plex-sans text-[13px] md:text-[14px] text-gray-500 leading-relaxed">
            Our site is temporarily unavailable. Please check back soon.
          </p>
        </div>

        <Analytics />
        <div
          className="flex justify-center"
          style={
            {
              '--foreground': '222.2 84% 4.9%',
              '--muted-foreground': '215.4 16.3% 46.9%',
            } as React.CSSProperties
          }
        >
          <SocialLinks />
        </div>
      </div>
    </main>
  )
}
