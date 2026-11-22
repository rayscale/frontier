'use client'

import { Button } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import { CoverHero } from '#/components/cover/index.js'
import IconGallery from '#/components/documentation/icon-gallery.js'

import '#/components/cover/cover.css'

/** The cover of the icons: the whole catalog, searchable, with its usage. */
export function IconsCover(): ReactElement {
  return (
    <main className="cover cover--wide">
      <CoverHero
        eyebrow="Icons"
        title="One grid, one stroke, every icon."
        description="Simple pictograms drawn on a 24 unit grid with a 2 unit stroke. Search the set and copy the import."
      >
        <Button asChild>
          <a href="/documentation/icons">Read the documentation</a>
        </Button>
      </CoverHero>
      <section className="cover-section" aria-labelledby="icons-catalog">
        <h2 id="icons-catalog">The catalog</h2>
        <IconGallery layout="split" />
      </section>
    </main>
  )
}
