import { Header, NavigationMenu } from '@rayscale/frontier'
import type { ReactElement } from 'react'
import { useLocation } from 'react-router'

import { Logo } from '#/components/logo/index.js'
import { ThemeToggle } from '#/components/theme/index.js'

import './site-header.css'

const links = [
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/docs/components' },
  { label: 'Symbols', href: '/docs/symbols' },
  { label: 'Typeface', href: '/docs/typeface' },
]

/** The header of the marketing pages. It collapses its links into a panel on narrow screens. */
export function SiteHeader(): ReactElement {
  const { pathname } = useLocation()

  return (
    <Header mode="dynamic" className="site-header">
      <a className="site-header__brand" href="/">
        <Logo />
        <span>Frontier</span>
      </a>
      <Header.NavigationMenu label="Main">
        <NavigationMenu.List>
          {links.map((link) => (
            <NavigationMenu.Item key={link.href}>
              <NavigationMenu.Link
                href={link.href}
                active={
                  link.href === '/docs' ? pathname === '/docs' : pathname.startsWith(link.href)
                }
              >
                {link.label}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </Header.NavigationMenu>
      <ThemeToggle />
    </Header>
  )
}
