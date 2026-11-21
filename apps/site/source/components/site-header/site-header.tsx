'use client'

import { Header, NavigationMenu } from '@rayscale/frontier'
import { usePathname } from 'next/navigation'
import type { ReactElement } from 'react'

import { Logo } from '#/components/logo/index.js'
import { ModeToggle } from '#/components/mode/index.js'

import './site-header.css'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Symbols', href: '/symbols' },
  { label: 'Typeface', href: '/typeface' },
  { label: 'Docs', href: '/docs' },
]

/** The header of the marketing pages. It collapses its links into a panel on narrow screens. */
export function SiteHeader(): ReactElement {
  const pathname = usePathname()

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
                active={link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)}
              >
                {link.label}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </Header.NavigationMenu>
      <ModeToggle />
    </Header>
  )
}
