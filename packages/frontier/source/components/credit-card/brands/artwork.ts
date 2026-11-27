import type { ReactNode } from 'react'

/** Official artwork of a card network, as drawn in `logo` (color) and `mono` (single color). */
export interface TBrandArtwork {
  /** Crop of the color logo within the 780 × 500 artboard. */
  colorViewBox: string
  /** Color logo. The id keeps gradient ids unique when several cards are on one page. */
  color: (id: string) => ReactNode
  /** Single-color logo, drawn in `currentColor`. */
  mono: () => ReactNode
}
