import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import {
  FooterBottom,
  FooterBrand,
  FooterContent,
  FooterHeading,
  FooterRoot,
  FooterSection,
} from './parts/sections.js'
import type { TFooterProps } from './types.js'

import './footer.css'

export type {
  TFooterBottomProps,
  TFooterBrandProps,
  TFooterContentProps,
  TFooterHeadingProps,
  TFooterProps,
  TFooterSectionProps,
} from './types.js'

export interface TFooterComponent extends ForwardRefExoticComponent<
  TFooterProps & RefAttributes<HTMLElement>
> {
  /** Renders the grid holding brand and navigation sections. */
  Content: typeof FooterContent
  /** Renders the brand region spanning the full width of the footer. */
  Brand: typeof FooterBrand
  /** Renders a navigation group section. */
  Section: typeof FooterSection
  /** Renders the title of a footer section. */
  Heading: typeof FooterHeading
  /** Renders the closing row (copyright, legal links). */
  Bottom: typeof FooterBottom
}

/**
 * Renders a page footer. TLayout and content come entirely from children, so
 * no brand, links, or column count are assumed. Use `Link` for links inside
 * the footer.
 */
export const Footer: TFooterComponent = Object.assign(FooterRoot, {
  Content: FooterContent,
  Brand: FooterBrand,
  Section: FooterSection,
  Heading: FooterHeading,
  Bottom: FooterBottom,
})
