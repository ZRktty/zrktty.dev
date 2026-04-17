import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-ibm-plex-sans)]">
      <main className=" w-full flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Hero />
      </main>
    </div>
  )
}
