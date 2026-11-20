import { CodeBlock, useHighlightedCode } from '@rayscale/frontier'
import { Children, isValidElement, type ReactElement, type ReactNode } from 'react'

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

interface THighlightedCodeProps {
  code: string
  language: string
  title?: string | undefined
}

/** A code block with syntax highlighting and a copy button. */
export function HighlightedCode({ code, language, title }: THighlightedCodeProps): ReactElement {
  const lines = useHighlightedCode(code, language)

  return (
    <CodeBlock className="docs-code">
      <CodeBlock.Header>
        <CodeBlock.Title>{title ?? language}</CodeBlock.Title>
        <CodeBlock.Actions>
          <CodeBlock.CopyButton value={code} />
        </CodeBlock.Actions>
      </CodeBlock.Header>
      <CodeBlock.Content>
        {lines.map((line, index) => (
          <CodeBlock.Line key={index}>{line}</CodeBlock.Line>
        ))}
      </CodeBlock.Content>
    </CodeBlock>
  )
}

/** Renders the fenced code blocks of a page. */
export function DocsPre({ children }: { children?: ReactNode }): ReactElement {
  const { code, language } = extractCode(children)

  return <HighlightedCode code={code} language={language} />
}
