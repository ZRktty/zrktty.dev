'use client'

import { CONTACT_TRIGGER_DEFAULT_LABEL } from '@/constants/contact'
import { CTA_OUTLINE_CLASSES } from '@/constants/ctaClasses'
import { cn } from '@/lib/utils'
import { useContactSheet } from './ContactSheetContext'

interface Props {
  /** Identifies the trigger in analytics — one value per placement, e.g. `about-contact`. */
  location: string
  label?: string
  className?: string
}

export function ContactTriggerButton({
  location,
  label = CONTACT_TRIGGER_DEFAULT_LABEL,
  className,
}: Props) {
  const { open } = useContactSheet()

  return (
    <button
      type="button"
      className={cn(CTA_OUTLINE_CLASSES, className)}
      onClick={() => open(location)}
    >
      {label}
    </button>
  )
}
