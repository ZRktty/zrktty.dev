
const ACCENT = '#00875A'
const MONO = 'var(--font-jetbrains-mono)'
const SANS = 'var(--font-ibm-plex-sans)'


function DotGrid({ cols, rows, gap, color }: { cols: number; rows: number; gap: number; color: string }) {
  return (
    <svg
      width={cols * gap} height={rows * gap} viewBox={`0 0 ${cols * gap} ${rows * gap}`}
      style={{ position: 'absolute', inset: 0, opacity: 0.08 }}
    >
      {Array.from({ length: cols }, (_, i) =>
        Array.from({ length: rows }, (_, j) => (
          <circle key={`${i}-${j}`} cx={i * gap + gap / 2} cy={j * gap + gap / 2} r="1.2" fill={color} />
        ))
      )}
    </svg>
  )
}

// ── VARIATION A — White, portrait-led ────────────────────────────────────────
function BannerA() {
  return (
    <div style={{
      width: 1584, height: 396,
      background: '#ffffff',
      display: 'flex',
      overflow: 'hidden',
      fontFamily: SANS,
      position: 'relative',
    }}>
      {/* LinkedIn profile photo placeholder — 160px diameter, 16px from left, center on bottom edge */}
      <svg width="192" height="396" viewBox="0 0 192 396" fill="none"
        style={{ position: 'absolute', left: 0, bottom: 0, pointerEvents: 'none' }}>
        <circle cx="96" cy="396" r="80"
          stroke="#cccccc" strokeWidth="1.5" strokeDasharray="5 4" fill="none" />
        <text x="96" y="340" textAnchor="middle" fill="#cccccc" fontSize="9" fontFamily="monospace">
          profile photo
        </text>
      </svg>

      {/* Content — starts 30px after right edge of placeholder circle (16 + 160 + 30 = 206px) */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 56px 0 206px',
        gap: '48px',
      }}>
        {/* Identity */}
        <div style={{ flex: '0 0 auto' }}>
          <p style={{
            fontFamily: MONO, fontSize: 11, fontWeight: 700,
            letterSpacing: '0.18em', color: ACCENT,
            textTransform: 'uppercase', margin: '0 0 10px',
          }}>
            Product Engineer
          </p>
          <h1 style={{
            fontFamily: MONO, fontSize: 44, fontWeight: 700,
            margin: '0 0 12px', color: '#111111',
            lineHeight: 1.05, letterSpacing: '-0.025em',
          }}>
            Zoltan<br />Rakottyai
          </h1>
          <p style={{
            margin: 0, fontFamily: MONO, fontSize: 11,
            color: '#888888', letterSpacing: '0.1em',
          }}>
            TypeScript · Next.js · NestJS · PostgreSQL · Docker
          </p>
        </div>

        {/* Vertical rule */}
        <div style={{ width: 1, alignSelf: 'stretch', margin: '48px 0', background: '#e5e5e5', flexShrink: 0 }} />

        {/* Tagline */}
        <div style={{ flex: 1 }}>
          <p style={{
            fontFamily: MONO, fontSize: 24, fontWeight: 700,
            color: '#111111', lineHeight: 1.25, margin: '0 0 14px',
          }}>
            From discovery<br />to deployment.
          </p>
          <p style={{ margin: '0 0 28px', fontSize: 12, color: '#888888', letterSpacing: '0.06em' }}>
            MVPs · Internal Tools · Scalable Platforms
          </p>
          <p style={{
            margin: 0, fontFamily: MONO, fontSize: 9.5,
            color: ACCENT, letterSpacing: '0.12em',
          }}>
            Discovery → Architecture → Build → Deploy
          </p>
        </div>
      </div>
    </div>
  )
}

// ── VARIATION B — White, freelance/async copy ────────────────────────────────
function BannerB() {
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

      {/* Content — same offset as A */}
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

// ── VARIATION C — Deep navy, dot grid, horizontal layout ─────────────────────
function BannerC() {
  const BG = '#151922'
  const TEXT = '#F2F2F2'
  const MUTED = '#64748b'
  const SUBTLE = '#1e2533'

  return (
    <div style={{
      width: 1584, height: 396,
      background: BG,
      overflow: 'hidden',
      fontFamily: SANS,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    }}>
      <DotGrid cols={53} rows={14} gap={30} color="#ffffff" />

      {/* Center block */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        padding: '0 120px',
      }}>
        {/* Top label */}
        <p style={{
          fontFamily: MONO, fontSize: 10, fontWeight: 700,
          letterSpacing: '0.24em', color: ACCENT,
          textTransform: 'uppercase', margin: '0 0 16px',
        }}>
          Product Engineer
        </p>

        {/* Name */}
        <h1 style={{
          fontFamily: MONO, fontSize: 56, fontWeight: 700,
          margin: '0 0 16px', color: TEXT,
          lineHeight: 1, letterSpacing: '-0.03em',
          textAlign: 'center',
        }}>
          Zoltan Rakottyai
        </h1>

        {/* Horizontal rule */}
        <div style={{ width: 560, height: 1, background: SUBTLE, margin: '0 0 16px' }} />

        {/* Stack row */}
        <p style={{
          fontFamily: MONO, fontSize: 11, color: MUTED,
          letterSpacing: '0.12em', margin: '0 0 24px',
          textAlign: 'center',
        }}>
          TypeScript · Next.js · NestJS · PostgreSQL · Docker
        </p>

        {/* Tagline + workflow in a row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <p style={{
            fontFamily: MONO, fontSize: 17, fontWeight: 700,
            color: TEXT, margin: 0, letterSpacing: '-0.01em',
          }}>
            From discovery to deployment.
          </p>
          <div style={{ width: 1, height: 20, background: '#2e3748' }} />
          <p style={{
            fontFamily: MONO, fontSize: 10, color: ACCENT,
            letterSpacing: '0.12em', margin: 0,
          }}>
            Discovery → Architecture → Build → Deploy
          </p>
          <div style={{ width: 1, height: 20, background: '#2e3748' }} />
          <p style={{ fontSize: 11, color: MUTED, letterSpacing: '0.06em', margin: 0 }}>
            MVPs · Internal Tools · Scalable Platforms
          </p>
        </div>
      </div>
    </div>
  )
}

export default function BannerPage() {
  const variants = [
    { label: 'A — White / Portrait-led', component: <BannerA /> },
    { label: 'B — Dark Charcoal / Architecture', component: <BannerB /> },
    { label: 'C — Deep Navy / Centered', component: <BannerC /> },
  ]

  return (
    <div style={{
      background: '#f0f0f0',
      minHeight: '100vh',
      padding: '48px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '48px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div>
        <h1 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 4px', color: '#111' }}>
          LinkedIn Banner — 1584 × 396px
        </h1>
        <p style={{ fontSize: 13, color: '#666', margin: 0 }}>
          Screenshot each banner at 100% zoom. Keep browser zoom at 1×.
        </p>
      </div>

      {variants.map(({ label, component }) => (
        <div key={label}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#555', margin: '0 0 8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {label}
          </p>
          <div style={{ display: 'inline-block', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
            {component}
          </div>
        </div>
      ))}
    </div>
  )
}
