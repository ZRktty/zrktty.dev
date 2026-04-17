'use client'

import { useTheme } from 'next-themes'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { prism as lightTheme } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { motion } from 'framer-motion'

interface CodeBlockProps {
  language?: string
  code: string
  filename?: string
}

export const CodeBlock = ({ language = 'text', code, filename }: CodeBlockProps) => {
  const { resolvedTheme } = useTheme()

  // resolvedTheme is undefined until next-themes hydrates on the client
  if (!resolvedTheme) return null

  const selectedTheme = resolvedTheme === 'dark' ? oneDark : lightTheme

  return (
    <motion.div
      className="my-4"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeIn' }}
      viewport={{ once: true, amount: 0.3 }}
    >
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
    </motion.div>
  )
}
