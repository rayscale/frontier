import { Sidebar } from '@rayscale/frontier'
import type { ReactElement } from 'react'
import { Outlet } from 'react-router'

import { SiteHeader } from '#/components/site-header/index.js'

import { DocsBreadcrumbs } from './docs-breadcrumbs.js'
import { DocsSidebarTree } from './docs-sidebar.js'

import './docs.css'

/** The documentation frame: the shared site header, the floating tree, and the page. */
export function DocsLayout(): ReactElement {
  return (
    <>
      <SiteHeader />
      <Sidebar.Root label="Documentation" variant="floating" className="docs-layout">
        <Sidebar.Content>
          <DocsSidebarTree />
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Trigger />
        </Sidebar.Footer>
        <Sidebar.Inset className="docs-layout__inset">
          <div className="docs-layout__trail">
            <Sidebar.Trigger />
            <DocsBreadcrumbs />
          </div>
          <Outlet />
        </Sidebar.Inset>
      </Sidebar.Root>
    </>
  )
}
