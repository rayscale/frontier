import type { ReactElement, ReactNode } from 'react'

import { SiteFooter } from '#/components/site-footer/index.js'
import { SiteHeader } from '#/components/site-header/index.js'

import './landing-layout.css'

/** The frame of the marketing pages: header, page, and footer. */
export function LandingLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="landing-layout">
      <SiteHeader />
      <div className="landing-layout__page">{children}</div>
      <SiteFooter />
    </div>
  )
}
