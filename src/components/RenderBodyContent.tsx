import { PortableText, PortableTextComponents } from '@portabletext/react'
import {CodeBlock} from "@/components/CodeBlock";
const components: PortableTextComponents = {
  types: {
    code: ({ value }) => {
      const { language, code } = value || {}
      return <CodeBlock language={language} code={code} />
    },
    // Handle other custom types like image, etc.
  },
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[]
}

export const RenderBodyContent = ({ value }: Props) => {
  return <PortableText value={value} components={components} />
}