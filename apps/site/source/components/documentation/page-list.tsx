'use client'

import { Card } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import { renderSidebarIcon } from '#/documentation/icons.js'
import type { TDocumentationPage } from '#/documentation/types.js'

import { createHeading } from './documentation-heading.js'

const GroupHeading = createHeading('h2')

function byOrder(a: TDocumentationPage, b: TDocumentationPage): number {
  return (
    (a.frontmatter.order ?? Number.POSITIVE_INFINITY) -
      (b.frontmatter.order ?? Number.POSITIVE_INFINITY) ||
    a.frontmatter.title.localeCompare(b.frontmatter.title)
  )
}

/** The pages directly under a path that appear in the documentation, in reading order. */
function childrenOf(path: string, pages: readonly TDocumentationPage[]): TDocumentationPage[] {
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

function PageCards({ pages }: { pages: readonly TDocumentationPage[] }): ReactElement {
  return (
    <ul className="documentation-page-list">
      {pages.map((page) => (
        <li key={page.path}>
          <Card as="article" className="documentation-page-list__card">
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
 * own, such as a category, becomes a group with its icon, its description, and
 * the cards of its pages.
 */
export function PageList({
  current,
  pages,
}: {
  current: TDocumentationPage
  pages: readonly TDocumentationPage[]
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
          <section key={page.path} className="documentation-page-list__group" aria-labelledby={id}>
            <GroupHeading id={id}>
              <a className="documentation-page-list__group-link" href={page.path}>
                {renderSidebarIcon(page.frontmatter.icon)}
                {page.frontmatter.title}
              </a>
            </GroupHeading>
            {page.frontmatter.description ? (
              <p className="documentation-page-list__group-description">
                {page.frontmatter.description}
              </p>
            ) : null}
            <PageCards pages={items} />
          </section>
        )
      })}
    </>
  )
}
