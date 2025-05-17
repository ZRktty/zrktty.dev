'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { prism as lightTheme } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  language?: string
  code: string
  filename?: string
}

export const CodeBlock = ({ language = 'text', code, filename }: CodeBlockProps) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Avoid hydration mismatch by skipping SSR render
  if (!mounted) return null

  const selectedTheme = resolvedTheme === 'dark' ? oneDark : lightTheme

  return (
    <div className="my-4">
      {filename && (
        <div className="bg-gray-800 text-gray-100 text-sm px-4 py-2 rounded-t-md font-mono">
          {filename}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={selectedTheme}
        customStyle={{
          margin: 0,
          padding: '1rem',
          borderRadius: filename ? '0 0 0.5rem 0.5rem' : '0.5rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}