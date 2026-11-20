import type { ReactElement } from 'react'
import { Outlet } from 'react-router'

import { SiteHeader } from '#/components/site-header/index.js'

import { DocsBreadcrumbs } from './docs-breadcrumbs.js'
import { DocsNav, DocsNavDrawer } from './docs-nav.js'

import './docs.css'

/** The documentation frame: the shared site header, the floating tree, and the page. */
export function DocsLayout(): ReactElement {
  return (
    <>
      <SiteHeader />
      <div className="docs-layout">
        <DocsNav />
        <div className="docs-layout__inset">
          <div className="docs-layout__trail">
            <DocsNavDrawer />
            <DocsBreadcrumbs />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  )
}
