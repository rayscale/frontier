import type { ReactElement } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'

import { ClientLinks } from '#/components/client-links/index.js'
import { ThemeProvider } from '#/components/theme/index.js'

/** Wraps every route with the theme, client-side link routing, and scroll restoration. */
export function RootLayout(): ReactElement {
  return (
    <ThemeProvider>
      <ClientLinks />
      <ScrollRestoration />
      <Outlet />
    </ThemeProvider>
  )
}
