import { client } from '@/sanity/client'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import type { BlockContent } from '@/sanity/types'

const { projectId, dataset } = client.config()
const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null

export const urlFor = (source: SanityImageSource) => (builder ? builder.image(source) : null)

export function estimateReadTime(body: BlockContent | undefined | null): number {
  if (!body || !Array.isArray(body)) return 0
  const text = body
    .flatMap((block) => {
      if (block._type !== 'block' || !('children' in block)) return []
      return (block.children ?? []).map((child) => child.text ?? '')
    })
    .join(' ')
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / 200))
}
