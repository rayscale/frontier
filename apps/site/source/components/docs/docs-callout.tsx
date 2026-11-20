import { Callout, CheckCircle, CircleX, Info, TriangleAlert } from '@rayscale/frontier'
import type { ReactElement, ReactNode } from 'react'

const symbols = {
  info: Info,
  success: CheckCircle,
  warning: TriangleAlert,
  danger: CircleX,
}

interface TDocsCalloutProps {
  title?: string | undefined
  tone?: keyof typeof symbols | undefined
  children?: ReactNode
}

/** A message in a page. Write the text directly inside; MDX creates the paragraph. */
export function DocsCallout({ title, tone = 'info', children }: TDocsCalloutProps): ReactElement {
  const Current = symbols[tone]

  return (
    <Callout tone={tone} className="docs-callout">
      <Callout.Symbol>
        <Current aria-hidden="true" />
      </Callout.Symbol>
      <Callout.Content>
        {title ? <Callout.Title>{title}</Callout.Title> : null}
        {children}
      </Callout.Content>
    </Callout>
  )
}
