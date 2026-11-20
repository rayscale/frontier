import { Button, Card } from '@rayscale/frontier'
import { type ReactElement, useEffect } from 'react'

import { PackageManagerTabs } from '#/components/docs/package-manager-tabs.js'

import './home.css'

const features = [
  {
    title: 'Components',
    href: '/docs/components',
    description: 'Accessible React components built on native HTML, with their API and usage.',
  },
  {
    title: 'Symbols',
    href: '/docs/symbols',
    description: 'A set of symbols that share one grid and one stroke.',
  },
  {
    title: 'Typeface',
    href: '/docs/typeface',
    description: 'Frontier Sans, the variable typeface of the system.',
  },
]

/** The landing page. */
export function Home(): ReactElement {
  useEffect(() => {
    document.title = 'Frontier'
  }, [])

  return (
    <main className="home">
      <section className="home__hero" aria-labelledby="home-title">
        <h1 id="home-title">A design language for the web.</h1>
        <p>
          Frontier brings together guidelines, design tokens, components, symbols, and a typeface,
          so an interface can be built from one set of rules.
        </p>
        <div className="home__actions">
          <Button asChild>
            <a href="/docs">Get started</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/docs/components">Browse components</a>
          </Button>
        </div>
      </section>
      <section className="home__section" aria-labelledby="home-system">
        <h2 id="home-system">One system</h2>
        <ul className="home__features">
          {features.map((feature) => (
            <li key={feature.href}>
              <Card as="article">
                <Card.Header>
                  <Card.Title as="h3">
                    <a href={feature.href}>{feature.title}</a>
                  </Card.Title>
                  <Card.Description>{feature.description}</Card.Description>
                </Card.Header>
              </Card>
            </li>
          ))}
        </ul>
      </section>
      <section className="home__section" aria-labelledby="home-install">
        <h2 id="home-install">Install</h2>
        <PackageManagerTabs
          pnpm="pnpm add @rayscale/frontier"
          npm="npm install @rayscale/frontier"
          yarn="yarn add @rayscale/frontier"
          bun="bun add @rayscale/frontier"
        />
      </section>
    </main>
  )
}
