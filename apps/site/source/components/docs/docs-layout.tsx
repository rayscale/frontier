import { Header, Sidebar } from '@rayscale/frontier'
import type { ReactElement } from 'react'
import { Outlet } from 'react-router'

import { Logo } from '#/components/logo/index.js'
import { ThemeToggle } from '#/components/theme/index.js'

import { DocsBreadcrumbs } from './docs-breadcrumbs.js'
import { DocsSidebarTree } from './docs-sidebar.js'

import './docs.css'

/** The documentation frame: the navigation tree beside a header and the page. */
export function DocsLayout(): ReactElement {
  return (
    <Sidebar.Root label="Documentation" className="docs-layout">
      <Sidebar.Header>
        <a className="docs-layout__home" href="/" aria-label="Frontier home">
          <Sidebar.Brand symbol={<Logo />}>Frontier</Sidebar.Brand>
        </a>
      </Sidebar.Header>
      <Sidebar.Content>
        <DocsSidebarTree />
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.Trigger />
      </Sidebar.Footer>
      <Sidebar.Inset className="docs-layout__inset">
        <Header mode="fixed" className="docs-layout__header">
          <div className="docs-layout__trail">
            <Sidebar.Trigger />
            <DocsBreadcrumbs />
          </div>
          <ThemeToggle />
        </Header>
        <Outlet />
      </Sidebar.Inset>
    </Sidebar.Root>
  )
}
