"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Image from "next/image"

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen text-center p-4">
      <div className="relative mb-4">
        <Image
          src="/portrait.jpg"
          alt="Zoltan Rakottyai"
          width={150}
          height={150}
          className="rounded-full"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4">Zoltan Rakottyai</h1>
      <p className="text-lg mb-8">Software Engineer & Web Developer</p>
      <p className="text-md mb-8">I specialize in creating dynamic and beautiful web pages. I have been in the field for nearly 10 years, and have been loving every minute of it.</p>
      <div className="flex gap-4">
        <Button size="lg">Get in Touch</Button>
        <Button variant="secondary" size="lg">View Portfolio</Button>
      </div>
    </section>
  )
}

export default Hero