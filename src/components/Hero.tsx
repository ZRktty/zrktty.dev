'use client'
import React from 'react'
import { Button } from '@/components/ui/button'

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col w-full justify-center h-screen text-left">
      <h1 className={`text-6xl sm:text-6xl  mb-4 font-vin-pro-mono  text-gray-900 dark:text-white`}>
        Zoltan Rakottyai
      </h1>
      <span className="text-lg sm:text-xl text-red-700 mb-8 font-mono text-left">
        {' '}
        Software Engineer / Frontend / Backend / Full-stack
      </span>
      <p className="text-lg text-left sm:text-xl text-gray-500 mb-8 max-w-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non augue quis enim lobortis
        ultrices. Aenean tempor mollis massa eget fringilla. Duis cursus elit eget pretium
        dignissim.
      </p>
      <Button variant="default" className="block w-44">
        Get in touch
      </Button>
    </div>
  )
}

export default Hero
