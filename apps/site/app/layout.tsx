import type { Metadata } from 'next'
import Script from 'next/script'
import type { ReactElement, ReactNode } from 'react'

import { ClientLinks } from '#/components/client-links/index.js'
import { ThemeProvider, themeScript } from '#/components/theme/index.js'

import '@rayscale/frontier/styles.css'
import '#/site.css'

export const metadata: Metadata = {
  title: { default: 'Frontier', template: '%s · Frontier' },
  description:
    'A design language for the web: guidelines, design tokens, components, symbols, and a typeface.',
}

/** The document: the theme, client-side link routing, and the global styles. */
export default function RootLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="frontier-theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <ThemeProvider>
          <ClientLinks />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
