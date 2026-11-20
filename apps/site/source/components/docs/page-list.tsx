import { Card } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import { pages } from '#/docs/pages.js'

import { useDocsPage } from './docs-context.js'

/** Lists the pages directly under the current page as cards. */
export function PageList(): ReactElement {
  const current = useDocsPage()
  const depth = current.path.split('/').length + 1
  const children = pages
    .filter(
      (page) =>
        page.path.startsWith(`${current.path}/`) &&
        page.path.split('/').length === depth &&
        page.frontmatter.sidebar !== false,
    )
    .sort(
      (a, b) =>
        (a.frontmatter.order ?? Number.POSITIVE_INFINITY) -
          (b.frontmatter.order ?? Number.POSITIVE_INFINITY) ||
        a.frontmatter.title.localeCompare(b.frontmatter.title),
    )

  return (
    <ul className="docs-page-list">
      {children.map((page) => (
        <li key={page.path}>
          <Card as="article" className="docs-page-list__card">
            <Card.Header>
              <Card.Title as="h3">
                <a href={page.path}>{page.frontmatter.title}</a>
              </Card.Title>
              {page.frontmatter.description ? (
                <Card.Description>{page.frontmatter.description}</Card.Description>
              ) : null}
            </Card.Header>
          </Card>
        </li>
      ))}
    </ul>
  )
}
