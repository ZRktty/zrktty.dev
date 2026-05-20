import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PrintButton } from './PrintButton'

interface Skill {
  category: string
  items: string[]
}

interface Experience {
  company: string
  url: string
  role: string
  period: string
  type: string
  bullets: string[]
}

interface Project {
  title: string
  url: string
  tech: string
  description: string
}

interface Language {
  language: string
  level: string
}

interface EarlierRole {
  company: string
  role: string
  period: string
}

interface CVData {
  job: string
  headline: string
  name?: string
  accent?: string
  phone?: string
  summary: string
  skills: Skill[]
  experiences: Experience[]
  projects: Project[]
  languages?: Language[]
  earlierCareer?: EarlierRole[]
}

const PHOTO_URL = '/ZRktty-dev-portrait-for_Lunkedin.webp'
const DEFAULT_ACCENT = '#00875A'
const INK = '#111111'
const MUTED = '#555555'
const MONO = 'var(--font-jetbrains-mono)'
const SANS = 'var(--font-ibm-plex-sans)'
const LINK: React.CSSProperties = { color: 'inherit', textDecoration: 'none' }

function SectionTitle({ children, accent }: { children: string; accent: string }) {
  return (
    <div style={{ marginBottom: '6px' }}>
      <h2
        style={{
          fontFamily: MONO,
          fontSize: '7.5pt',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color: accent,
          margin: 0,
        }}
      >
        {children}
      </h2>
      <div style={{ height: '1px', backgroundColor: '#e5e5e5', marginTop: '3px' }} />
    </div>
  )
}

export default async function CVPage({ params }: { params: Promise<{ job: string }> }) {
  const { job } = await params
  const filePath = path.join(process.cwd(), 'docs/jobdesc', `${job}.json`)

  if (!fs.existsSync(filePath)) notFound()

  const cv: CVData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  const accent = cv.accent ?? DEFAULT_ACCENT
  const displayName = cv.name ?? 'ZOLTAN RAKOTTYAI'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

        @page {
          size: A4;
          margin: 12mm 15mm;
        }

        @media print {
          html, body {
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
          .cv-shell {
            background: white !important;
            padding: 0 !important;
          }
          .cv-page {
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
            min-height: unset !important;
            padding: 0 !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div className="cv-shell" style={{ minHeight: '100vh', background: '#f0f0f0', padding: '32px 0' }}>
        <div
          className="no-print"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <PrintButton />
          <span style={{ fontFamily: MONO, fontSize: '11px', color: '#666' }}>
            Set margins to &ldquo;None&rdquo; in the print dialog for exact A4
          </span>
        </div>

        <div
          className="cv-page"
          style={{
            background: 'white',
            width: '210mm',
            minHeight: '297mm',
            margin: '0 auto',
            padding: '12mm 15mm',
            boxShadow: '0 4px 32px rgba(0,0,0,0.15)',
            fontFamily: SANS,
            color: INK,
            fontSize: '9pt',
            lineHeight: 1.45,
          }}
        >
          {/* ── HEADER ── */}
          <header style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '10px' }}>
            <Image
              src={PHOTO_URL}
              alt={displayName}
              width={77}
              height={77}
              style={{ objectFit: 'cover', objectPosition: 'center', flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontFamily: MONO,
                  fontSize: '18pt',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: INK,
                  margin: 0,
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase' as const,
                }}
              >
                {displayName}
              </h1>
              <p style={{ fontFamily: MONO, fontSize: '9.5pt', color: accent, margin: '3px 0 6px', fontWeight: 500 }}>
                {cv.headline}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0 14px', fontSize: '8pt', color: MUTED }}>
                <a href="mailto:zoltan@zrktty.dev" style={LINK}>zoltan@zrktty.dev</a>
                {cv.phone && <span>{cv.phone}</span>}
                <a href="https://www.linkedin.com/in/zoltanrakottyai" style={LINK}>linkedin.com/in/zoltanrakottyai</a>
                <a href="https://github.com/zrktty" style={LINK}>github.com/zrktty</a>
                <a href="https://zrktty.dev" style={LINK}>zrktty.dev</a>
                <span>Las Palmas, Spain (UTC+1)</span>
              </div>
            </div>
          </header>

          <div style={{ height: '2.5px', background: accent, marginBottom: '10px' }} />

          {/* ── SUMMARY ── */}
          <section style={{ marginBottom: '10px' }}>
            <SectionTitle accent={accent}>Summary</SectionTitle>
            <p style={{ margin: 0 }}>{cv.summary}</p>
          </section>

          {/* ── SKILLS ── */}
          <section style={{ marginBottom: '10px' }}>
            <SectionTitle accent={accent}>Skills</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px 12px' }}>
              {cv.skills.map((group) => (
                <div key={group.category}>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: '7pt',
                      fontWeight: 700,
                      color: MUTED,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {group.category}
                  </span>
                  <p style={{ margin: '1px 0 0', fontSize: '8.5pt' }}>{group.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── EXPERIENCE ── */}
          <section style={{ marginBottom: '10px' }}>
            <SectionTitle accent={accent}>Experience</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {cv.experiences.map((exp, i) => (
                <div key={i} style={{ pageBreakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1px' }}>
                    <a href={exp.url} style={{ ...LINK, fontFamily: MONO, fontWeight: 700, fontSize: '9.5pt' }}>
                      {exp.company}
                    </a>
                    <span style={{ fontSize: '8pt', color: MUTED, fontFamily: MONO }}>{exp.period}</span>
                  </div>
                  <p style={{ margin: '0 0 3px', fontSize: '8.5pt', color: accent, fontWeight: 500 }}>
                    {exp.role} · {exp.type}
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: '8.5pt', lineHeight: 1.4 }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── PROJECTS ── */}
          <section style={{ marginBottom: cv.earlierCareer || cv.languages ? '10px' : 0 }}>
            <SectionTitle accent={accent}>Selected Projects</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {cv.projects.map((proj, i) => (
                <div key={i} style={{ pageBreakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: '9pt' }}>{proj.title}</span>
                    <a href={proj.url} style={{ ...LINK, fontSize: '7.5pt', color: MUTED, fontFamily: MONO }}>
                      {proj.url.replace('https://', '')}
                    </a>
                  </div>
                  <p style={{ margin: '1px 0 2px', fontSize: '7.5pt', color: accent, fontFamily: MONO }}>{proj.tech}</p>
                  <p style={{ margin: 0, fontSize: '8.5pt' }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── EARLIER CAREER ── */}
          {cv.earlierCareer && cv.earlierCareer.length > 0 && (
            <section style={{ marginBottom: cv.languages ? '10px' : 0, pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <SectionTitle accent={accent}>Earlier Career</SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {cv.earlierCareer.map((role, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5pt' }}>
                    <span>
                      <span style={{ fontFamily: MONO, fontWeight: 700 }}>{role.company}</span>
                      <span style={{ color: MUTED }}> — {role.role}</span>
                    </span>
                    <span style={{ fontFamily: MONO, fontSize: '8pt', color: MUTED }}>{role.period}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── LANGUAGES ── */}
          {cv.languages && cv.languages.length > 0 && (
            <section>
              <SectionTitle accent={accent}>Languages</SectionTitle>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' as const }}>
                {cv.languages.map((lang, i) => (
                  <span key={i} style={{ fontSize: '8.5pt' }}>
                    <span style={{ fontFamily: MONO, fontWeight: 700 }}>{lang.language}</span>
                    <span style={{ color: MUTED }}> — {lang.level}</span>
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
