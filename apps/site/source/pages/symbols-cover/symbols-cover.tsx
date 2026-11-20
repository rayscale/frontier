import { Button } from '@rayscale/frontier'
import { type ReactElement, useEffect } from 'react'

import { CoverHero } from '#/components/cover/index.js'
import SymbolGallery from '#/components/docs/symbol-gallery.js'

import '#/components/cover/cover.css'

/** The cover of the symbols: the whole catalog, searchable, with its usage. */
export function SymbolsCover(): ReactElement {
  useEffect(() => {
    document.title = 'Symbols · Frontier'
  }, [])

  return (
    <main className="cover cover--wide">
      <CoverHero
        eyebrow="Symbols"
        title="One grid, one stroke, every symbol."
        description="Simple pictograms drawn on a 24 unit grid with a 2 unit stroke. Search the set and copy the import."
      >
        <Button asChild>
          <a href="/docs/symbols">Read the docs</a>
        </Button>
      </CoverHero>
      <section className="cover-section" aria-labelledby="symbols-catalog">
        <h2 id="symbols-catalog">The catalog</h2>
        <SymbolGallery layout="split" />
      </section>
    </main>
  )
}
