'use client'

import { CodeBlock, useHighlightedCode } from '@rayscale/frontier'
import type { ReactElement } from 'react'

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
