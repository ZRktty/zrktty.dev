'use client'

import { useState } from 'react'
import posthog from 'posthog-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AnalyticsEvent } from '@/constants/analyticsEvents'
import {
  CONTACT_API_PATH,
  HONEYPOT_FIELD_NAME,
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
} from '@/constants/contact'
import { contactFormSchema } from '@/lib/contact/schema'
import { ContactErrorResponse, ContactResponse } from '@/types'

const MESSAGE_ROWS = 6

const NETWORK_FAILURE = 'Could not reach the server. Check your connection and try again.'

type Status = 'idle' | 'submitting' | 'success'

type FieldErrors = NonNullable<ContactErrorResponse['fieldErrors']>

const EMPTY_VALUES = { name: '', email: '', message: '' }

const LABEL_CLASSES = 'font-jetbrains-mono text-[11px] uppercase tracking-widest'
const FIELD_CLASSES = 'font-jetbrains-mono text-sm rounded-none'
const ERROR_CLASSES = 'font-jetbrains-mono text-[11px] text-red-600 dark:text-red-400'

interface Props {
  /** Placement the sheet was opened from — attached to every event this form fires. */
  location: string | null
  onDone: () => void
}

export function ContactForm({ location, onDone }: Props) {
  const [values, setValues] = useState(EMPTY_VALUES)
  const [honeypot, setHoneypot] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')

  const setField = (field: keyof typeof EMPTY_VALUES) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setFieldErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    // Validate with the same schema the route uses, so the common mistakes never
    // cost a round trip.
    const parsed = contactFormSchema.safeParse(values)
    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors
      setFieldErrors({
        name: flattened.name?.[0],
        email: flattened.email?.[0],
        message: flattened.message?.[0],
      })
      return
    }

    setStatus('submitting')

    let result: ContactResponse
    try {
      const response = await fetch(CONTACT_API_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...parsed.data, [HONEYPOT_FIELD_NAME]: honeypot }),
      })
      result = (await response.json()) as ContactResponse
    } catch {
      setStatus('idle')
      setFormError(NETWORK_FAILURE)
      posthog.capture(AnalyticsEvent.ContactFormFailed, { location, reason: 'network' })
      return
    }

    if (!result.ok) {
      setStatus('idle')
      setFieldErrors(result.fieldErrors ?? {})
      setFormError(result.error)
      posthog.capture(AnalyticsEvent.ContactFormFailed, { location, reason: 'rejected' })
      return
    }

    setStatus('success')
    posthog.capture(AnalyticsEvent.ContactFormSubmitted, { location })
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-4">
        <p className="font-jetbrains-mono text-sm text-foreground dark:text-white">
          Message sent. I reply within 24 hours, except when I&apos;m on a flight or at the beach.
        </p>
        <Button type="button" variant="outline" className="rounded-none" onClick={onDone}>
          Close
        </Button>
      </div>
    )
  }

  const isSubmitting = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-name" className={LABEL_CLASSES}>
          Name
        </Label>
        <Input
          id="contact-name"
          name="name"
          value={values.name}
          onChange={(event) => setField('name')(event.target.value)}
          maxLength={MAX_NAME_LENGTH}
          autoComplete="name"
          disabled={isSubmitting}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
          className={FIELD_CLASSES}
        />
        {fieldErrors.name && (
          <p id="contact-name-error" className={ERROR_CLASSES}>
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-email" className={LABEL_CLASSES}>
          Email
        </Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => setField('email')(event.target.value)}
          maxLength={MAX_EMAIL_LENGTH}
          autoComplete="email"
          disabled={isSubmitting}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
          className={FIELD_CLASSES}
        />
        {fieldErrors.email && (
          <p id="contact-email-error" className={ERROR_CLASSES}>
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message" className={LABEL_CLASSES}>
          Message
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={MESSAGE_ROWS}
          value={values.message}
          onChange={(event) => setField('message')(event.target.value)}
          maxLength={MAX_MESSAGE_LENGTH}
          disabled={isSubmitting}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
          className={FIELD_CLASSES}
        />
        {fieldErrors.message && (
          <p id="contact-message-error" className={ERROR_CLASSES}>
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Honeypot — off-screen rather than display:none, which some bots skip. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name={HONEYPOT_FIELD_NAME}
          type="text"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {formError && (
        <p role="alert" className={ERROR_CLASSES}>
          {formError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="rounded-none font-jetbrains-mono">
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
