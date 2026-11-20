import { type ReactElement, Suspense, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

import { docsPageContext } from '#/components/docs/docs-context.js'
import { DocsPageHeader } from '#/components/docs/docs-page-header.js'
import { DocsPager } from '#/components/docs/docs-pager.js'
import { DocsToc } from '#/components/docs/docs-toc.js'
import { mdxComponents } from '#/components/docs/mdx-components.js'
import { useHeadings } from '#/components/docs/use-headings.js'
import { findPage, getPageContent } from '#/docs/pages.js'
import type { TDocsPage } from '#/docs/types.js'
import { NotFound } from '#/pages/not-found/index.js'

import './docs-page.css'

function DocsPageView({ page }: { page: TDocsPage }): ReactElement {
  const Content = getPageContent(page)
  const article = useRef<HTMLElement | null>(null)
  const headings = useHeadings(article)

  useEffect(() => {
    document.title = `${page.frontmatter.title} · Frontier`
  }, [page.frontmatter.title])

  return (
    <docsPageContext.Provider value={page}>
      <div className="docs-page">
        <div className="docs-page__main">
          <DocsPageHeader page={page} />
          <article ref={article} className="docs-prose">
            <Suspense fallback={<p role="status">Loading…</p>}>
              <Content components={mdxComponents} />
            </Suspense>
          </article>
          <DocsPager path={page.path} />
        </div>
        <DocsToc headings={headings} />
      </div>
    </docsPageContext.Provider>
  )
}

/** Renders the documentation page for the current URL, or the not found page. */
export function DocsPage(): ReactElement {
  const { pathname } = useLocation()
  const page = findPage(pathname)

  return page ? <DocsPageView key={page.path} page={page} /> : <NotFound />
}
