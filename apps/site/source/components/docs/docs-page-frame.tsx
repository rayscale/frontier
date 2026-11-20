'use client'

import { type ReactElement, type ReactNode, useRef } from 'react'

import { DocsToc } from './docs-toc.js'
import { useHeadings } from './use-headings.js'

import './docs-page.css'

/**
 * The columns of a documentation page. The article is rendered on the server and handed in as
 * children; this frame reads its headings in the browser for the table of contents.
 */
export function DocsPageFrame({
  header,
  pager,
  children,
}: {
  header: ReactNode
  pager: ReactNode
  children: ReactNode
}): ReactElement {
  const article = useRef<HTMLElement | null>(null)
  const headings = useHeadings(article)

  return (
    <div className="docs-page">
      <div className="docs-page__main">
        {header}
        <article ref={article} className="docs-prose">
          {children}
        </article>
        {pager}
      </div>
      <DocsToc headings={headings} />
    </div>
  )
}
