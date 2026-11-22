import type { Metadata } from 'next'
import Script from 'next/script'
import type { ReactElement, ReactNode } from 'react'

import { ClientLinks } from '#/components/client-links/index.js'
import { ModeProvider, modeScript } from '#/components/mode/index.js'

import '@rayscale/frontier/styles.css'
import '#/site.css'

export const metadata: Metadata = {
  title: { default: 'Frontier', template: '%s · Frontier' },
  description: 'A design language for the web: guidelines, design tokens, components and icons.',
}

/** The document: the mode, client-side link routing, and the global styles. */
export default function RootLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="frontier-mode" strategy="beforeInteractive">
          {modeScript}
        </Script>
        <ModeProvider>
          <ClientLinks />
          {children}
        </ModeProvider>
      </body>
    </html>
  )
}
