import { flag } from 'flags/next'

export const maintenanceMode = flag<boolean>({
  key: 'maintenance-mode',
  defaultValue: false,
  decide: () => false,
  description: 'Redirect all traffic to /maintenance when enabled',
})
