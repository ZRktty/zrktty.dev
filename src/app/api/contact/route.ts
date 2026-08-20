import { NextResponse } from 'next/server'
import { checkBotId } from 'botid/server'
import { Resend } from 'resend'
import {
  CONTACT_FROM_ADDRESS,
  CONTACT_SUBJECT_PREFIX,
  HONEYPOT_FIELD_NAME,
} from '@/constants/contact'
import { contactFormSchema, honeypotSchema } from '@/lib/contact/schema'
import { client } from '@/sanity/client'
import { CONTACT_EMAIL_QUERY } from '@/sanity/queries'
import { ContactResponse } from '@/types'

/** The destination changes about never, but a stale forwarder should not survive a deploy cycle. */
const DESTINATION_REVALIDATE_SECONDS = 3600

const GENERIC_FAILURE = 'Something broke on my end. Try again, or reach me on LinkedIn.'

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status })
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

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set')
    return json({ ok: false, error: GENERIC_FAILURE }, 500)
  }

  const destination = await client.fetch<string | null>(
    CONTACT_EMAIL_QUERY,
    {},
    { next: { revalidate: DESTINATION_REVALIDATE_SECONDS } },
  )
  if (!destination) {
    console.error('[contact] no contactEmail on the aboutMe document')
    return json({ ok: false, error: GENERIC_FAILURE }, 500)
  }

  const { name, email, message } = parsed.data
  const { error } = await new Resend(apiKey).emails.send({
    from: CONTACT_FROM_ADDRESS,
    to: destination,
    replyTo: email,
    subject: `${CONTACT_SUBJECT_PREFIX} ${name}`,
    text: `${message}\n\n—\n${name} <${email}>`,
  })

  if (error) {
    console.error('[contact] resend rejected the send:', error.name, error.message)
    return json({ ok: false, error: GENERIC_FAILURE }, 500)
  }

  return json({ ok: true }, 200)
}
