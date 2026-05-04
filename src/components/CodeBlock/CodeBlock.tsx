'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { vs as vsLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'

const CHIP_FONT = 'var(--font-ibm-plex-mono), ui-monospace, monospace'

interface CodeBlockProps {
  language?: string
  code: string
  filename?: string
}

export const CodeBlock = ({ language = 'text', code, filename }: CodeBlockProps) => {
  const { resolvedTheme } = useTheme()
  const [copied, setCopied] = useState(false)

  // resolvedTheme is undefined until next-themes hydrates on the client
  if (!resolvedTheme) return null

  const isDark = resolvedTheme === 'dark'
  const selectedTheme = isDark ? vscDarkPlus : vsLight

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <motion.div
      className="relative my-4 bg-muted/50"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeIn' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Language / filename chip — top left */}
      <div
        className="absolute left-0 top-0 border-b border-r border-border/30 bg-border/30 px-3 py-1"
        style={{ fontFamily: CHIP_FONT }}
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {filename ?? language}
        </span>
      </div>

      {/* Copy button — top right */}
      <button
        onClick={handleCopy}
        className="absolute right-0 top-0 flex items-center gap-1.5 border-b border-l border-border/30 bg-border/30 px-3 py-1 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
        style={{ fontFamily: CHIP_FONT }}
        aria-label="Copy code to clipboard"
      >
        {copied ? <Check size={11} className="text-[#00E676]" /> : <Copy size={11} />}
        <span className={`text-[10px] uppercase tracking-widest ${copied ? 'text-[#00E676]' : ''}`}>
          {copied ? 'Copied' : 'Copy'}
        </span>
      </button>

      <SyntaxHighlighter
        language={language}
        style={selectedTheme}
        customStyle={{
          margin: 0,
          padding: '3rem 2rem 2rem',
          background: 'transparent',
          borderRadius: 0,
          fontFamily: CHIP_FONT,
          fontSize: '0.875rem',
          lineHeight: '1.625',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </motion.div>
  )
}
