'use client'

import { Button } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import { CoverHero } from '#/components/cover/index.js'

import { Showcase } from './showcase.js'

import '#/components/cover/cover.css'
import './components-cover.css'

/** The cover of the components: a live sample of the set, with a way into the documentation. */
export function ComponentsCover(): ReactElement {
  return (
    <main className="cover cover--wide">
      <CoverHero
        eyebrow="Components"
        title="Components built on native HTML."
        description="Accessible React components that share one set of tokens. Everything below is the real component, not a picture of it."
      >
        <Button asChild>
          <a href="/docs/components">Read the docs</a>
        </Button>
        <Button asChild variant="outline">
          <a href="/docs/installation">Install</a>
        </Button>
      </CoverHero>
      <Showcase />
    </main>
  )
}
