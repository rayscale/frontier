import { Children, isValidElement, type ReactElement, type ReactNode } from 'react'

import { HighlightedCode } from './highlighted-code.js'

interface TCodeProps {
  className?: string
  children?: ReactNode
}

/** Reads the language and the text of a fenced code block rendered by MDX. */
export function extractCode(children: ReactNode): { code: string; language: string } {
  const [child] = Children.toArray(children)

  if (!isValidElement<TCodeProps>(child)) {
    return { code: '', language: 'text' }
  }

  const language = /language-([\w-]+)/.exec(child.props.className ?? '')?.[1] ?? 'text'
  const text = typeof child.props.children === 'string' ? child.props.children : ''

  return { code: text.replace(/\n$/, ''), language }
}

/** Renders the fenced code blocks of a page. */
export function DocsPre({ children }: { children?: ReactNode }): ReactElement {
  const { code, language } = extractCode(children)

  return <HighlightedCode code={code} language={language} />
}
