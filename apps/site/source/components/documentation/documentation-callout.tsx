'use client'

import { Callout, CheckCircle, CircleX, Info, TriangleAlert } from '@rayscale/frontier'
import type { ReactElement, ReactNode } from 'react'

const icons = {
  info: Info,
  success: CheckCircle,
  warning: TriangleAlert,
  danger: CircleX,
}

interface TDocumentationCalloutProps {
  title?: string | undefined
  tone?: keyof typeof icons | undefined
  children?: ReactNode
}

/** A message in a page. Write the text directly inside; MDX creates the paragraph. */
export function DocumentationCallout({
  title,
  tone = 'info',
  children,
}: TDocumentationCalloutProps): ReactElement {
  const Current = icons[tone]

  return (
    <Callout tone={tone} className="documentation-callout">
      <Callout.Icon>
        <Current aria-hidden="true" />
      </Callout.Icon>
      <Callout.Content>
        {title ? <Callout.Title>{title}</Callout.Title> : null}
        {children}
      </Callout.Content>
    </Callout>
  )
}
