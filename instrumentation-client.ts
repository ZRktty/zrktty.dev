import posthog from 'posthog-js'
import { initBotId } from 'botid/client/core'
import { CONTACT_API_PATH } from '@/constants/contact'

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN

if (token) {
  posthog.init(token, {
    api_host: '/ingest',
    ui_host: 'https://eu.posthog.com',
    defaults: '2026-01-30',
    capture_exceptions: true,
    debug: process.env.NODE_ENV === 'development',
  })
}

// Next 16 is past 15.3, so initBotId is the supported path over <BotIdClient />.
initBotId({ protect: [{ path: CONTACT_API_PATH, method: 'POST' }] })
