import { flag } from 'flags/next'
import { vercelAdapter } from '@flags-sdk/vercel'

export const maintenanceMode = flag<boolean>({
  key: 'maintenance_mode',
  adapter: vercelAdapter(),
  defaultValue: false,
  description: 'Rewrite all traffic to /maintenance with 503 when enabled',
})
