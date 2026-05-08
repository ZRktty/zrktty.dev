import Hero from '@/components/Hero'
import { HowIWork } from '@/components/HowIWork'
import { Services } from '@/components/Services'
import { FeaturedProjects } from '@/components/FeaturedProjects'
import { Testimonial } from '@/components/Testimonial'

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-ink-bg">
      <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <Hero />
        <HowIWork />
        <Services />
        <FeaturedProjects />
        <Testimonial />
      </main>
    </div>
  )
}
