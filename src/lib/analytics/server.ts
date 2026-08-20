import { PostHog } from 'posthog-node'

/**
 * Server-side error reporting. `console.error` still runs alongside every call here —
 * platform logs stay the fastest way to read a failure, this adds grouping, stack traces
 * and alerting on top.
 */

/**
 * Server code cannot use the `/ingest` reverse proxy the browser goes through; that path
 * only exists inside a page request. It talks to the PostHog host directly.
 */
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com'

/**
 * Nothing on the server belongs to a browsing visitor, so events group under one synthetic
 * actor rather than creating a person profile per failed request.
 */
const SERVER_DISTINCT_ID = 'server'

/**
 * A serverless instance can freeze the moment a response is returned, so batching would
 * silently drop the very errors worth reporting. Send each event immediately.
 */
const IMMEDIATE_DELIVERY = { flushAt: 1, flushInterval: 0 } as const

export interface ServerErrorContext {
  /** Where it happened, e.g. `contact-route` */
  scope: string
  /** Which step failed, so issues stay separable within one route */
  stage: string
  [key: string]: unknown
}

/**
 * Reports an exception and resolves once it has actually been delivered. Never throws:
 * a broken analytics call must not turn a handled failure into an unhandled one.
 */
export async function captureServerException(
  error: unknown,
  context: ServerErrorContext,
): Promise<void> {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
  if (!token) return

  const client = new PostHog(token, { host: POSTHOG_HOST, ...IMMEDIATE_DELIVERY })

  try {
    const thrown = error instanceof Error ? error : new Error(String(error))
    client.captureException(thrown, SERVER_DISTINCT_ID, context)
    // shutdown flushes the queue; without awaiting it the event dies with the instance.
    await client.shutdown()
  } catch (reportingError) {
    console.error('[analytics] failed to report a server exception:', reportingError)
  }
}
