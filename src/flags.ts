import { flag } from 'flags/next'

export const maintenanceMode = flag<boolean>({
  key: 'maintenance-mode',
  defaultValue: false,
  decide: () => false,
  description: 'Rewrite all traffic to /maintenance with 503 when enabled',
})
