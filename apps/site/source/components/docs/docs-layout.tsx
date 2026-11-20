import type { ReactElement, ReactNode } from 'react'

import { SiteHeader } from '#/components/site-header/index.js'
import { loadDocs } from '#/docs/pages.js'

import { DocsBreadcrumbs } from './docs-breadcrumbs.js'
import { DocsNav, DocsNavDrawer } from './docs-nav.js'
import { DocsProvider } from './docs-provider.js'

import './docs.css'

/** The documentation frame: the shared site header, the floating tree, and the page. */
export async function DocsLayout({ children }: { children: ReactNode }): Promise<ReactElement> {
  const { pages } = await loadDocs()

  return (
    <DocsProvider pages={pages}>
      <SiteHeader />
      <div className="docs-layout">
        <DocsNav />
        <div className="docs-layout__inset">
          <div className="docs-layout__trail">
            <DocsNavDrawer />
            <DocsBreadcrumbs />
          </div>
          {children}
        </div>
      </div>
    </DocsProvider>
  )
}
