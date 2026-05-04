'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { vs as vsLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'

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
      className="my-4 border border-border"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeIn' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Header bar — always visible; holds filename label and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <div
          className="flex items-center gap-3 text-xs"
          style={{ fontFamily: 'var(--font-ibm-plex-mono), ui-monospace, monospace' }}
        >
          {filename ? (
            <>
              <span className="text-[0.6rem] uppercase tracking-widest text-muted-foreground opacity-70">
                source
              </span>
              <span className="text-foreground">{filename}</span>
            </>
          ) : (
            <span className="text-[0.6rem] uppercase tracking-widest text-muted-foreground opacity-70">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          style={{ fontFamily: 'var(--font-ibm-plex-mono), ui-monospace, monospace' }}
          aria-label="Copy code to clipboard"
        >
          {copied ? <Check size={13} className="text-[#00E676]" /> : <Copy size={13} />}
          <span className={copied ? 'text-[#00E676]' : ''}>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={selectedTheme}
        customStyle={{
          margin: 0,
          padding: '1rem',
          borderRadius: 0,
          fontFamily: 'var(--font-ibm-plex-mono), ui-monospace, monospace',
          fontSize: '0.8125rem',
          lineHeight: '1.6',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </motion.div>
  )
}
