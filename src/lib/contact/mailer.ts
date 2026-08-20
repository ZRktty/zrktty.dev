import nodemailer, { type Transporter } from 'nodemailer'
import { SMTP_SECURE_PORT, SMTP_TIMEOUT_MS } from '@/constants/contact'

export interface SmtpCredentials {
  host: string
  port: number
  user: string
  password: string
}

/**
 * Reads SMTP settings from the environment, returning null rather than throwing so the
 * route can answer with its generic error instead of a stack trace. Values live only on
 * the server — nothing here is `NEXT_PUBLIC_`.
 */
export function readSmtpCredentials(): SmtpCredentials | null {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const password = process.env.SMTP_PASSWORD
  const port = Number(process.env.SMTP_PORT ?? SMTP_SECURE_PORT)

  if (!host || !user || !password || !Number.isFinite(port)) return null

  return { host, port, user, password }
}

/**
 * A fresh transport per request. Serverless instances are recycled unpredictably, and a
 * pooled connection that outlives its instance fails on the next invocation instead of
 * saving a handshake.
 */
export function createTransport({ host, port, user, password }: SmtpCredentials): Transporter {
  return nodemailer.createTransport({
    host,
    port,
    // Implicit TLS on 465; on 587 the connection opens plain and upgrades via STARTTLS.
    secure: port === SMTP_SECURE_PORT,
    auth: { user, pass: password },
    connectionTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
  })
}
