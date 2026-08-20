import type { NextConfig } from 'next'
import { withBotId } from 'botid/next/config'

// Anti-clickjacking. The site is never framed — no iframes, no Sanity Presentation
// tool — so both framing controls are set to deny outright.
// `frame-ancestors` is the modern directive; `X-Frame-Options` covers legacy browsers
// that ignore CSP. Deliberately a frame-ancestors-only CSP: a full policy would have
// to allow-list PostHog, BotID and Sanity CDN and is out of scope here.
const FRAME_ANCESTORS_POLICY = "frame-ancestors 'none'"
const FRAME_OPTIONS_POLICY = 'DENY'
const ALL_ROUTES = '/:path*'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: ALL_ROUTES,
        headers: [
          { key: 'Content-Security-Policy', value: FRAME_ANCESTORS_POLICY },
          { key: 'X-Frame-Options', value: FRAME_OPTIONS_POLICY },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/array/:path*',
        destination: 'https://eu-assets.i.posthog.com/array/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
    ]
  },
  skipTrailingSlashRedirect: true,
}

// withBotId injects its own rewrites — the PostHog /ingest/* rewrites above are preserved.
export default withBotId(nextConfig)
