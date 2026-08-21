'use client'

import posthog from 'posthog-js'
import { useCallback, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { AnalyticsEvent } from '@/constants/analyticsEvents'
import { ContactForm } from './ContactForm'
import { ContactSheetContext } from './ContactSheetContext'

interface Props {
  children: React.ReactNode
}

/**
 * Mounts the contact sheet once for the whole layout, so any page can open it through
 * `useContactSheet()` without owning a copy of the form. `children` is a prop rather
 * than a wrapped subtree so server components below it stay server components.
 */
export function ContactSheetProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [location, setLocation] = useState<string | null>(null)

  const open = useCallback((next: string) => {
    setLocation(next)
    setIsOpen(true)
    posthog.capture(AnalyticsEvent.ContactFormOpened, { location: next })
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  return (
    <ContactSheetContext.Provider value={{ isOpen, location, open, close }}>
      {children}

      {/* Radix unmounts the content on close, so a second open always starts on a clean form. */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-6 text-left">
            <SheetTitle className="font-jetbrains-mono text-lg">Send me a message</SheetTitle>
            <SheetDescription className="font-jetbrains-mono text-[13px]">
              Tell me what you are building and what you need. I reply within 24 hours.
            </SheetDescription>
          </SheetHeader>

          <ContactForm location={location} onDone={close} />
        </SheetContent>
      </Sheet>
    </ContactSheetContext.Provider>
  )
}
