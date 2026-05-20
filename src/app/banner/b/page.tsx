const ACCENT = '#00875A'
const MONO = 'var(--font-jetbrains-mono)'
const SANS = 'var(--font-ibm-plex-sans)'

export default function BannerBExport() {
  return (
    <div style={{
      width: 1584, height: 396,
      background: '#ffffff',
      display: 'flex',
      overflow: 'hidden',
      fontFamily: SANS,
      position: 'relative',
    }}>
      {/* Profile photo placeholder */}
      <svg width="192" height="396" viewBox="0 0 192 396" fill="none"
        style={{ position: 'absolute', left: 0, bottom: 0, pointerEvents: 'none' }}>
        <circle cx="96" cy="396" r="80"
          stroke="#cccccc" strokeWidth="1.5" strokeDasharray="5 4" fill="none" />
        <text x="96" y="340" textAnchor="middle" fill="#cccccc" fontSize="9" fontFamily="monospace">
          profile photo
        </text>
      </svg>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 56px 0 320px',
        gap: '48px',
      }}>
        {/* Identity */}
        <div style={{ flex: '0 0 auto' }}>
          <p style={{
            fontFamily: MONO, fontSize: 12, fontWeight: 700,
            letterSpacing: '0.18em', color: ACCENT,
            textTransform: 'uppercase', margin: '0 0 10px',
          }}>
            Software Engineer · Consultant
          </p>
          <h1 style={{
            fontFamily: MONO, fontSize: 48, fontWeight: 700,
            margin: '0 0 12px', color: '#111111',
            lineHeight: 1.05, letterSpacing: '-0.025em',
          }}>
            Zoltan<br />Rakottyai
          </h1>
          <p style={{
            margin: 0, fontFamily: MONO, fontSize: 12,
            color: '#888888', letterSpacing: '0.1em',
          }}>
            Node.js · Next.js · TypeScript · PostgreSQL · Docker
          </p>
        </div>

        {/* Vertical rule */}
        <div style={{ width: 1, alignSelf: 'stretch', margin: '48px 0', background: '#e5e5e5', flexShrink: 0 }} />

        {/* Tagline */}
        <div style={{ flex: 1 }}>
          <p style={{
            fontFamily: MONO, fontSize: 26, fontWeight: 700,
            color: '#111111', lineHeight: 1.25, margin: '0 0 14px',
          }}>
            Solo on small bets.<br />Embedded on bigger ones.
          </p>
          <p style={{ margin: '0 0 28px', fontSize: 13, color: '#888888', letterSpacing: '0.06em' }}>
            Freelance · Async-first · End-to-end
          </p>
          <p style={{
            margin: 0, fontFamily: MONO, fontSize: 10.5,
            color: ACCENT, letterSpacing: '0.12em',
          }}>
            Discovery → Architecture → Build → Deploy
          </p>
        </div>
      </div>
    </div>
  )
}
