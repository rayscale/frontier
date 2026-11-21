'use client'

import { Footer } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import { Logo } from '#/components/logo/index.js'

import './site-footer.css'

/** The footer of the marketing pages. */
export function SiteFooter(): ReactElement {
  return (
    <Footer className="site-footer">
      <Footer.Content>
        <Footer.Brand>
          <span className="site-footer__brand">
            <Logo />
            Frontier
          </span>
          <p className="site-footer__summary">A design language for the web.</p>
        </Footer.Brand>
        <Footer.Section>
          <Footer.Heading>Documentation</Footer.Heading>
          <ul className="site-footer__links">
            <li>
              <a href="/docs">Introduction</a>
            </li>
            <li>
              <a href="/docs/installation">Installation</a>
            </li>
            <li>
              <a href="/components">Components</a>
            </li>
          </ul>
        </Footer.Section>
        <Footer.Section>
          <Footer.Heading>System</Footer.Heading>
          <ul className="site-footer__links">
            <li>
              <a href="/symbols">Symbols</a>
            </li>
            <li>
              <a href="/typeface">Typeface</a>
            </li>
            <li>
              <a href="/docs/guidelines">Guidelines</a>
            </li>
          </ul>
        </Footer.Section>
      </Footer.Content>
      <Footer.Bottom>Frontier is licensed under the MIT License.</Footer.Bottom>
    </Footer>
  )
}
