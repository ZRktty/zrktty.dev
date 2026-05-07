'use client'

import React, { useEffect, useState } from 'react'

const formatTimeString = (date: Date, locale: string = 'en-US') => {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Madrid',
    timeZoneName: 'short',
  }).format(date)
}

const LocalTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
  const formattedTime = formatTimeString(currentTime, locale)

  return (
    <div className="md:text-right">
      <p className="font-ibm-plex-mono text-xs text-muted-foreground">Local time</p>
      <p
        className="font-ibm-plex-mono font-medium text-sm text-foreground uppercase"
        suppressHydrationWarning
      >
        {formattedTime}
      </p>
    </div>
  )
}

export default LocalTime
