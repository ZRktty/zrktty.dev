import Image from 'next/image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { CodeBlock } from '@/components/CodeBlock'
import { urlFor } from '@/sanity/utils'

const components: PortableTextComponents = {
  types: {
    code: ({ value }) => {
      const { language, code } = value || {}
      return <CodeBlock language={language} code={code} />
    },
    image: ({ value }) => {
      const url = urlFor(value)?.url()
      if (!url) return null
      const width: number = value.width ?? 800
      const height: number = value.height ?? 450
      return (
        <figure className="my-6">
          <Image
            src={url}
            alt={value.alt ?? ''}
            width={width}
            height={height}
            className="w-full h-auto"
          />
        </figure>
      )
    },
  },
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[]
}

export const RenderBodyContent = ({ value }: Props) => {
  return <PortableText value={value} components={components} />
}
