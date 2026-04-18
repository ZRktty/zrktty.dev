import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen px-4 py-6 md:px-8 md:py-12 font-[family-name:var(--font-ibm-plex-sans)]">
      <main className="w-full flex flex-col gap-8 row-start-2 items-center md:items-start">
        <Hero />
      </main>
    </div>
  )
}
