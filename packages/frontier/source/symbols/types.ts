import type { ComponentPropsWithoutRef, ForwardRefExoticComponent, RefAttributes } from 'react'

/** Attributes of one shape on the 24-unit symbol grid. */
export interface TSymbolAttributes {
  [attribute: string]: string | number
}

/** One shape on the 24-unit symbol grid, as an element tag and its attributes. */
export type TSymbolNode = readonly (readonly [tag: string, attributes: TSymbolAttributes])[]

export type TSymbolProps = Omit<
  ComponentPropsWithoutRef<'svg'>,
  'children' | 'height' | 'width'
> & {
  symbolNode: TSymbolNode
  /** Width and height of the symbol in pixels, or any CSS length. Defaults to 24. */
  size?: number | string
}

export interface TCreateSymbolOptions {
  name: string
  symbolNode: TSymbolNode
}

/** A symbol component that also exposes the shapes it draws. */
export type TSymbolComponent = ForwardRefExoticComponent<
  Omit<TSymbolProps, 'symbolNode'> & RefAttributes<SVGSVGElement>
> & {
  symbolNode: TSymbolNode
}

/** Descriptive metadata for one symbol, derived from its `symbol.json`. */
export interface TSymbolMetadata {
  /** Kebab-case name of the source directory. */
  name: string
  /** PascalCase component exported from the package. */
  component: string
  /** Human-readable description of the symbol. */
  description: string
  /** Search terms for the symbol. */
  keywords: string[]
  /** Groups the symbol belongs to, such as `ui` or `status`. */
  categories: string[]
  /** Free-form tags. */
  tags: string[]
  /** Alternative names the symbol may be known by. */
  aliases: string[]
  /** Intended contexts for using the symbol. */
  useCases: string[]
  /** People who contributed the symbol. */
  contributors: string[]
}
