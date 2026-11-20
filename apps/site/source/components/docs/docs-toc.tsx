'use client'

import { TableOfContents } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { THeadingBranch } from '#/docs/headings.js'

/** The sections of the current page, with the active one tracked as the page scrolls. */
export function DocsToc({ headings }: { headings: THeadingBranch[] }): ReactElement | null {
  if (headings.length === 0) {
    return null
  }

  return (
    <TableOfContents className="docs-toc" side="right">
      <TableOfContents.Header>On this page</TableOfContents.Header>
      <TableOfContents.List>
        {headings.map((heading) => (
          <TableOfContents.Item key={heading.id} href={`#${heading.id}`} label={heading.label}>
            {heading.children.length > 0 ? (
              <TableOfContents.List>
                {heading.children.map((child) => (
                  <TableOfContents.Item key={child.id} href={`#${child.id}`} label={child.label} />
                ))}
              </TableOfContents.List>
            ) : null}
          </TableOfContents.Item>
        ))}
      </TableOfContents.List>
    </TableOfContents>
  )
}
