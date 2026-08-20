'use client'

import { createContext, useContext } from 'react'

export interface ContactSheetContextValue {
  isOpen: boolean
  /** Where the sheet was opened from, e.g. `about-contact`. Carried into analytics. */
  location: string | null
  open: (location: string) => void
  close: () => void
}

export const ContactSheetContext = createContext<ContactSheetContextValue | null>(null)

/** Throws outside the provider — a trigger button that renders but cannot open is worse than a crash. */
export function useContactSheet(): ContactSheetContextValue {
  const context = useContext(ContactSheetContext)
  if (!context) {
    throw new Error('useContactSheet must be used inside <ContactSheetProvider>')
  }
  return context
}
