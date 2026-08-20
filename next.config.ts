import type { NextConfig } from 'next'
import { withBotId } from 'botid/next/config'

const SANITY_IMAGE_HOST = 'cdn.sanity.io'
// Dev-only: @vercel/analytics pulls its debug build from this host. In production it
// serves the real script from same-origin /_vercel/insights/script.js instead.
const VERCEL_ANALYTICS_DEBUG_HOST = 'https://va.vercel-scripts.com'
const ALL_ROUTES = '/:path*'
const isDev = process.env.NODE_ENV === 'development'

// Full Content Security Policy. Everything the browser loads is same-origin:
// PostHog goes through the /ingest/* rewrites below, BotID through the rewrite
// withBotId injects, Vercel Analytics through /_vercel/insights, and next/font
// self-hosts its files at build time. cdn.sanity.io is only listed for images —
// Sanity asset URLs are what next/image optimises from.
//
// `script-src` keeps 'unsafe-inline' on purpose: the App Router streams its RSC
// payload through inline <script> tags. The strict alternative — a per-request
// nonce from proxy.ts — forces every page to render dynamically, which would
// disable the ISR this site is built on (every Sanity query sets `revalidate`).
// `style-src` keeps it too, and a nonce could not replace it there: next/image,
// framer-motion and react-syntax-highlighter all emit inline `style` attributes,
// which nonces do not cover.
//
// 'unsafe-eval' is dev-only — React uses eval to rebuild server error stacks in
// the browser. Neither React nor Next needs it in production.
const CSP_DIRECTIVES = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? ` 'unsafe-eval' ${VERCEL_ANALYTICS_DEBUG_HOST}` : ''}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' blob: data: https://${SANITY_IMAGE_HOST}`,
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Anti-clickjacking. The site is never framed — no iframes, no Sanity
  // Presentation tool — so both framing controls deny outright. `frame-ancestors`
  // is the modern directive; `X-Frame-Options` covers browsers that ignore CSP.
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
]
const CONTENT_SECURITY_POLICY = CSP_DIRECTIVES.join('; ')
const FRAME_OPTIONS_POLICY = 'DENY'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: SANITY_IMAGE_HOST,
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
          { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
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
