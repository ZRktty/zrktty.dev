// Contact form — shared between the client form, the zod schema, and the API route.
// Every literal the form and the route both need lives here, so validation can never
// drift between the two sides.

/**
 * Name of the honeypot input. Hidden from humans, so any non-empty value means a bot
 * filled the form. Deliberately plausible — bots fill fields whose names they recognise.
 */
export const HONEYPOT_FIELD_NAME = 'company'

export const MAX_NAME_LENGTH = 80

/** RFC 5321 caps a forward-path at 254 characters. */
export const MAX_EMAIL_LENGTH = 254

/** Short enough to be no burden, long enough that "hi" alone does not reach the inbox. */
export const MIN_MESSAGE_LENGTH = 20
export const MAX_MESSAGE_LENGTH = 4000

export const CONTACT_API_PATH = '/api/contact'

/**
 * Resend's shared sender. Works without any DNS, but an unverified Resend account may
 * only send to its own owner address. Swap to `Contact form <contact@send.zrktty.dev>`
 * once the `send.zrktty.dev` subdomain is verified — the subdomain is deliberate, it
 * leaves the apex SPF that cPanel mail depends on untouched.
 */
export const CONTACT_FROM_ADDRESS = 'zrktty.dev <onboarding@resend.dev>'

export const CONTACT_SUBJECT_PREFIX = '[zrktty.dev]'

export const CONTACT_TRIGGER_DEFAULT_LABEL = 'Send me a message'
