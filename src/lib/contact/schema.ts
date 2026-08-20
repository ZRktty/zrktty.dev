import { z } from 'zod'
import {
  HONEYPOT_FIELD_NAME,
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  MIN_MESSAGE_LENGTH,
} from '@/constants/contact'

/**
 * One schema, imported by both the form and the route handler, so the browser and the
 * server can never disagree about what a valid submission is. Messages are user-facing.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Tell me who you are.')
    .max(MAX_NAME_LENGTH, `Keep it under ${MAX_NAME_LENGTH} characters.`),
  email: z
    .email('That does not look like an email address.')
    .max(MAX_EMAIL_LENGTH, `Keep it under ${MAX_EMAIL_LENGTH} characters.`),
  message: z
    .string()
    .trim()
    .min(MIN_MESSAGE_LENGTH, `A few more words please — at least ${MIN_MESSAGE_LENGTH} characters.`)
    .max(MAX_MESSAGE_LENGTH, `That is over ${MAX_MESSAGE_LENGTH} characters. Trim it down.`),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

/**
 * Reads the honeypot off an unknown body without asserting its shape. `z.object` strips
 * unknown keys instead of rejecting them, so this parses any JSON object and yields only
 * the trap field.
 */
export const honeypotSchema = z.object({
  [HONEYPOT_FIELD_NAME]: z.string().optional(),
})
