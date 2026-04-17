'use client'

import React, { useEffect, useState } from 'react'

const formatTimeString = (date: Date, locale: string = 'en-US') => {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Atlantic/Canary',
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
    <div>
      <h5>Local time</h5>
      <div suppressHydrationWarning>{formattedTime}</div>
    </div>
  )
}

export default LocalTime
