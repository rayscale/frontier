'use client'

import { Button } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import { CoverHero } from '#/components/cover/index.js'
import ThemeGallery from '#/components/docs/theme-gallery.js'

import '#/components/cover/cover.css'

/** The cover of the themes: every theme, with a way to choose the theme of the site. */
export function ThemesCover(): ReactElement {
  return (
    <main className="cover cover--wide">
      <CoverHero
        eyebrow="Themes"
        title="One system, in your voice."
        description="Named sets of values that restyle every component. Choose one, and the whole site follows it."
      >
        <Button asChild>
          <a href="/docs/themes">Read the docs</a>
        </Button>
        <Button asChild variant="outline">
          <a href="/docs/themes/creating">Create a theme</a>
        </Button>
      </CoverHero>
      <section className="cover-section" aria-labelledby="themes-gallery">
        <h2 id="themes-gallery">The themes</h2>
        <ThemeGallery />
      </section>
    </main>
  )
}
