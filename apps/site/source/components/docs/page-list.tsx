'use client'

import { Card } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import { renderSidebarSymbol } from '#/docs/symbols.js'
import type { TDocsPage } from '#/docs/types.js'

import { createHeading } from './docs-heading.js'

const GroupHeading = createHeading('h2')

function byOrder(a: TDocsPage, b: TDocsPage): number {
  return (
    (a.frontmatter.order ?? Number.POSITIVE_INFINITY) -
      (b.frontmatter.order ?? Number.POSITIVE_INFINITY) ||
    a.frontmatter.title.localeCompare(b.frontmatter.title)
  )
}

/** The pages directly under a path that appear in the documentation, in reading order. */
function childrenOf(path: string, pages: readonly TDocsPage[]): TDocsPage[] {
  const depth = path.split('/').length + 1

  return pages
    .filter(
      (page) =>
        page.path.startsWith(`${path}/`) &&
        page.path.split('/').length === depth &&
        page.frontmatter.sidebar !== false,
    )
    .sort(byOrder)
}

function PageCards({ pages }: { pages: readonly TDocsPage[] }): ReactElement {
  return (
    <ul className="docs-page-list">
      {pages.map((page) => (
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

/**
 * Lists the pages directly under a page as cards. A page that has pages of its
 * own, such as a category, becomes a group with its symbol, its description, and
 * the cards of its pages.
 */
export function PageList({
  current,
  pages,
}: {
  current: TDocsPage
  pages: readonly TDocsPage[]
}): ReactElement {
  const children = childrenOf(current.path, pages)
  const groups = children
    .map((page) => ({ page, items: childrenOf(page.path, pages) }))
    .filter(({ items }) => items.length > 0)
  const leaves = children.filter((page) => !groups.some((group) => group.page === page))

  return (
    <>
      {leaves.length > 0 ? <PageCards pages={leaves} /> : null}
      {groups.map(({ page, items }) => {
        const id = page.path.split('/').at(-1)

        return (
          <section key={page.path} className="docs-page-list__group" aria-labelledby={id}>
            <GroupHeading id={id}>
              <a className="docs-page-list__group-link" href={page.path}>
                {renderSidebarSymbol(page.frontmatter.symbol)}
                {page.frontmatter.title}
              </a>
            </GroupHeading>
            {page.frontmatter.description ? (
              <p className="docs-page-list__group-description">{page.frontmatter.description}</p>
            ) : null}
            <PageCards pages={items} />
          </section>
        )
      })}
    </>
  )
}
