'use client'

import { useEffect } from 'react'
import { ACCENT_RED } from '@/constants'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '1rem',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Something went wrong</h1>
        <p style={{ maxWidth: '28rem', color: '#6b7280' }}>
          The application failed to start. This is often a content or configuration problem rather
          than the page itself.
        </p>
        <button
          onClick={() => reset()}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            background: ACCENT_RED,
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
