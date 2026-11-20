import { Badge, Button } from '@rayscale/frontier'
import { type ReactElement, useEffect } from 'react'

import { GlyphExplorer } from './glyph-explorer.js'
import { TypeTester } from './type-tester.js'
import { Wordmark } from './wordmark.js'

import '#/components/cover/cover.css'
import './typeface-cover.css'

/** The cover of the typeface: a tester, and a sample of its characters. */
export function TypefaceCover(): ReactElement {
  useEffect(() => {
    document.title = 'Typeface · Frontier'
  }, [])

  return (
    <main className="cover cover--wide">
      <section className="typeface-cover__hero" aria-labelledby="cover-title">
        <p className="typeface-cover__badge">
          <Badge variant="secondary">Typeface</Badge>
          Geist for text and Geist Mono for code
        </p>
        <h1 id="cover-title" className="sr-only">
          Set in Geist.
        </h1>
        <Wordmark />
        <div className="cover-hero__actions">
          <Button asChild>
            <a href="/docs/typeface">Read the docs</a>
          </Button>
        </div>
      </section>
      <section className="cover-section" aria-labelledby="typeface-characters">
        <h2 id="typeface-characters">Characters</h2>
        <GlyphExplorer />
      </section>
      <section className="cover-section" aria-labelledby="typeface-tester">
        <h2 id="typeface-tester">Try it</h2>
        <TypeTester />
      </section>
      <p className="typeface-cover__credit">
        Geist is by Vercel and licensed under the SIL Open Font License 1.1.
      </p>
    </main>
  )
}
