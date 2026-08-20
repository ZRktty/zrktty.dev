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
 * Display name on the From header. The address itself is not configurable — cPanel only
 * lets an authenticated session send as its own mailbox, so the route uses `SMTP_USER`.
 * Hardcoding a second address here would just produce a mismatch cPanel rejects.
 */
export const CONTACT_FROM_NAME = 'zrktty.dev contact form'

export const CONTACT_SUBJECT_PREFIX = '[zrktty.dev]'

/** cPanel's implicit-TLS port. On 587 nodemailer must start unencrypted and STARTTLS up. */
export const SMTP_SECURE_PORT = 465

/**
 * A hung mail server must not hold a serverless function open — the platform would let it
 * run for minutes while the visitor stares at a spinner.
 */
export const SMTP_TIMEOUT_MS = 10_000

export const CONTACT_TRIGGER_DEFAULT_LABEL = 'Send me a message'
