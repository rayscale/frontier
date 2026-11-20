import { Badge } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TDocsPage } from '#/docs/types.js'

const statusVariants = { draft: 'warning', beta: 'info', stable: 'success' } as const

/** The title, status, and description at the top of a page. */
export function DocsPageHeader({ page }: { page: TDocsPage }): ReactElement {
  const { title, description, status } = page.frontmatter

  return (
    <header className="docs-page-header">
      <div className="docs-page-header__title">
        <h1>{title}</h1>
        {status ? <Badge variant={statusVariants[status]}>{status}</Badge> : null}
      </div>
      {description ? <p className="docs-page-header__description">{description}</p> : null}
    </header>
  )
}
