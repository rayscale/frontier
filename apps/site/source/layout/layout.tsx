import type { ReactElement } from 'react'
import { Link, Outlet } from 'react-router'

import './layout.css'

/** Frames every page with the site header and the page content. */
export function Layout(): ReactElement {
  return (
    <div className="site-layout">
      <header className="site-layout__header">
        <Link className="site-layout__brand" to="/">
          Frontier
        </Link>
      </header>
      <main className="site-layout__content">
        <Outlet />
      </main>
    </div>
  )
}
