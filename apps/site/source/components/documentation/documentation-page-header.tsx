'use client'

import { Badge } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TDocumentationPage } from '#/documentation/types.js'

const statusVariants = { draft: 'warning', beta: 'info', stable: 'success' } as const

/** The title, status, and description at the top of a page. */
export function DocumentationPageHeader({ page }: { page: TDocumentationPage }): ReactElement {
  const { title, description, status } = page.frontmatter

  return (
    <header className="documentation-page-header">
      <div className="documentation-page-header__title">
        <h1>{title}</h1>
        {status ? <Badge variant={statusVariants[status]}>{status}</Badge> : null}
      </div>
      {description ? <p className="documentation-page-header__description">{description}</p> : null}
    </header>
  )
}
