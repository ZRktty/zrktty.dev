import { EmailParts } from '@/types'

/**
 * The address is split server-side and only rejoined in the browser after a
 * user gesture, so no contiguous `user@domain` string ever appears in the
 * rendered HTML or the serialized RSC payload. This is obfuscation, not
 * security: it defeats regex-based harvesters, not a headless browser.
 */
const EMAIL_SEPARATOR = '@'

/** Sanity's contactEmail is validated as a plain address, but older values may carry query params. */
const QUERY_SEPARATOR = '?'

export function splitEmail(email?: string | null): EmailParts | null {
  if (!email) return null

  const address = email.split(QUERY_SEPARATOR)[0].trim()
  const separatorIndex = address.lastIndexOf(EMAIL_SEPARATOR)

  // Reject anything without a non-empty local part and domain.
  if (separatorIndex <= 0 || separatorIndex === address.length - 1) return null

  return {
    user: address.slice(0, separatorIndex),
    domain: address.slice(separatorIndex + 1),
  }
}

export function joinEmail({ user, domain }: EmailParts): string {
  return `${user}${EMAIL_SEPARATOR}${domain}`
}

const MAILTO_SCHEME = 'mailto:'

export function mailtoHref(address: string): string {
  return `${MAILTO_SCHEME}${address}`
}
