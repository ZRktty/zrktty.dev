'use client'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        fontFamily: 'var(--font-jetbrains-mono)',
        background: '#E53935',
        color: 'white',
        border: 'none',
        padding: '8px 20px',
        fontSize: '13px',
        fontWeight: 700,
        cursor: 'pointer',
        letterSpacing: '0.05em',
      }}
    >
      PRINT / SAVE PDF
    </button>
  )
}
