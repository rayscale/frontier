import type { ComponentPropsWithoutRef, ForwardRefExoticComponent, RefAttributes } from 'react'

/** Attributes of one shape on the 24-unit icon grid. */
export interface TIconAttributes {
  [attribute: string]: string | number
}

/** One shape on the 24-unit icon grid, as an element tag and its attributes. */
export type TIconNode = readonly (readonly [tag: string, attributes: TIconAttributes])[]

/** Named steps of the icon size scale. */
export type TIconSize = 'inline' | 'control' | 'standalone'

export type TIconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children' | 'height' | 'width'> & {
  iconNode: TIconNode
  /** Named size from the icon scale. Defaults to `inline`. */
  size?: TIconSize
}

export interface TCreateIconOptions {
  name: string
  iconNode: TIconNode
}

/** An icon component that also exposes the shapes it draws. */
export type TIconComponent = ForwardRefExoticComponent<
  Omit<TIconProps, 'iconNode'> & RefAttributes<SVGSVGElement>
> & {
  iconNode: TIconNode
}

/** Descriptive metadata for one icon, derived from its `icon.json`. */
export interface TIconMetadata {
  /** Kebab-case name of the source directory. */
  name: string
  /** PascalCase component exported from the package. */
  component: string
  /** Human-readable description of the icon. */
  description: string
  /** Search terms for the icon. */
  keywords: string[]
  /** Groups the icon belongs to, such as `ui` or `status`. */
  categories: string[]
  /** Free-form tags. */
  tags: string[]
  /** Alternative names the icon may be known by. */
  aliases: string[]
  /** Intended contexts for using the icon. */
  useCases: string[]
  /** People who contributed the icon. */
  contributors: string[]
}
