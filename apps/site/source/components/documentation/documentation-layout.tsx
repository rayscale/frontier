import type { ReactElement, ReactNode } from 'react'

import { SiteHeader } from '#/components/site-header/index.js'
import { loadDocumentation } from '#/documentation/pages.js'

import { DocumentationBreadcrumbs } from './documentation-breadcrumbs.js'
import { DocumentationNav, DocumentationNavDrawer } from './documentation-nav.js'
import { DocumentationProvider } from './documentation-provider.js'

import './documentation.css'

/** The documentation frame: the shared site header, the floating tree, and the page. */
export async function DocumentationLayout({
  children,
}: {
  children: ReactNode
}): Promise<ReactElement> {
  const { pages } = await loadDocumentation()

  return (
    <DocumentationProvider pages={pages}>
      <SiteHeader />
      <div className="documentation-layout">
        <DocumentationNav />
        <div className="documentation-layout__inset">
          <div className="documentation-layout__trail">
            <DocumentationNavDrawer />
            <DocumentationBreadcrumbs />
          </div>
          {children}
        </div>
      </div>
    </DocumentationProvider>
  )
}
