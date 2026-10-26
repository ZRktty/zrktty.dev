import { createClient } from 'next-sanity'

const DEFAULT_API_VERSION = '2024-02-09'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || DEFAULT_API_VERSION

if (!projectId) {
  throw new Error(
    'NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Add it to .env.local (see .env.example).',
  )
}

if (!dataset) {
  throw new Error(
    'NEXT_PUBLIC_SANITY_DATASET is not set. Add it to .env.local (see .env.example).',
  )
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})
