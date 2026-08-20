import { NextResponse } from 'next/server'
import { checkBotId } from 'botid/server'
import { CONTACT_FROM_NAME, CONTACT_SUBJECT_PREFIX, HONEYPOT_FIELD_NAME } from '@/constants/contact'
import { captureServerException } from '@/lib/analytics/server'
import { createTransport, readSmtpCredentials } from '@/lib/contact/mailer'
import { contactFormSchema, honeypotSchema } from '@/lib/contact/schema'
import { client } from '@/sanity/client'
import { CONTACT_EMAIL_QUERY } from '@/sanity/queries'
import { ContactResponse } from '@/types'

/** The destination changes about never, but a stale forwarder should not survive a deploy cycle. */
const DESTINATION_REVALIDATE_SECONDS = 3600

const GENERIC_FAILURE = 'Something broke on my end. Try again, or reach me on LinkedIn.'

/** Groups every failure from this route under one scope in PostHog error tracking. */
const ERROR_SCOPE = 'contact-route'

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status })
}

/**
 * Every 500 the visitor sees is deliberately vague, so each one is reported with the stage
 * that produced it — otherwise the only difference between a missing password and an
 * unreachable mail host is a line in a log nobody is watching.
 */
async function reportFailure(stage: string, error: unknown, extra?: Record<string, unknown>) {
  console.error(`[contact] ${stage}:`, error)
  await captureServerException(error, { scope: ERROR_SCOPE, stage, ...extra })
}

export async function POST(request: Request) {
  const { isBot } = await checkBotId()
  if (isBot) {
    return json({ ok: false, error: 'Request denied.' }, 403)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Malformed request.' }, 400)
  }

  // Honeypot: a human never sees this field, so anything in it is a bot. Answer 200 and
  // drop the message — a bot that learns it was caught just comes back smarter.
  const probe = honeypotSchema.safeParse(body)
  if (probe.success && probe.data[HONEYPOT_FIELD_NAME]?.trim()) {
    return json({ ok: true }, 200)
  }

  const parsed = contactFormSchema.safeParse(body)
  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors
    return json(
      {
        ok: false,
        error: 'Check the fields below.',
        fieldErrors: {
          name: flattened.name?.[0],
          email: flattened.email?.[0],
          message: flattened.message?.[0],
        },
      },
      400,
    )
  }

  const credentials = readSmtpCredentials()
  if (!credentials) {
    await reportFailure(
      'smtp-config-missing',
      new Error('SMTP_HOST, SMTP_USER or SMTP_PASSWORD is not set'),
    )
    return json({ ok: false, error: GENERIC_FAILURE }, 500)
  }

  const destination = await client.fetch<string | null>(
    CONTACT_EMAIL_QUERY,
    {},
    { next: { revalidate: DESTINATION_REVALIDATE_SECONDS } },
  )
  if (!destination) {
    await reportFailure('destination-missing', new Error('no contactEmail on the aboutMe document'))
    return json({ ok: false, error: GENERIC_FAILURE }, 500)
  }

  const { name, email, message } = parsed.data
  try {
    await createTransport(credentials).sendMail({
      // cPanel only permits the authenticated mailbox in From. The visitor's address goes
      // in Reply-To, so hitting reply answers them rather than this mailbox.
      from: `${CONTACT_FROM_NAME} <${credentials.user}>`,
      to: destination,
      replyTo: `${name} <${email}>`,
      subject: `${CONTACT_SUBJECT_PREFIX} ${name}`,
      text: `${message}\n\n—\n${name} <${email}>`,
    })
  } catch (error) {
    // nodemailer puts the useful discriminator on `code` — EAUTH, ETIMEDOUT, ECONNREFUSED.
    // Promoting it to a property keeps a bad password from grouping with a dead host.
    const code = error instanceof Error && 'code' in error ? String(error.code) : undefined
    await reportFailure('smtp-send-failed', error, { smtp_code: code, smtp_host: credentials.host })
    return json({ ok: false, error: GENERIC_FAILURE }, 500)
  }

  return json({ ok: true }, 200)
}
