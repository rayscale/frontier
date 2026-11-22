'use client'

import { type ReactElement, type ReactNode, useRef } from 'react'

import { DocumentationToc } from './documentation-toc.js'
import { useHeadings } from './use-headings.js'

import './documentation-page.css'

/**
 * The columns of a documentation page. The article is rendered on the server and handed in as
 * children; this frame reads its headings in the browser for the table of contents.
 */
export function DocumentationPageFrame({
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
    <div className="documentation-page">
      <div className="documentation-page__main">
        {header}
        <article ref={article} className="documentation-prose">
          {children}
        </article>
        {pager}
      </div>
      <DocumentationToc headings={headings} />
    </div>
  )
}
