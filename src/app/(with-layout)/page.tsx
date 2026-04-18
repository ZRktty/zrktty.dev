import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div className="min-h-screen py-6 md:py-12 font-[family-name:var(--font-ibm-plex-sans)]">
      <main className="w-full flex flex-col gap-8">
        <Hero />
      </main>
    </div>
  )
}
