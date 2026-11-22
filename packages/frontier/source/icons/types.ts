import type { ComponentPropsWithoutRef, ForwardRefExoticComponent, RefAttributes } from 'react'

/** Attributes of one shape on the 24-unit icon grid. */
export interface TIconAttributes {
  [attribute: string]: string | number
}

/** One shape on the 24-unit icon grid, as an element tag and its attributes. */
export type TIconNode = readonly (readonly [tag: string, attributes: TIconAttributes])[]

/**
 * The kind of movement an icon makes. Directions nudge the icon along its arrow, a turn opens or
 * closes, a draw completes, a ring calls attention, and a sweep shows progress.
 */
export type TIconMotion =
  'nudge-up' | 'nudge-right' | 'nudge-down' | 'nudge-left' | 'turn' | 'draw' | 'ring' | 'sweep'

export type TIconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children' | 'height' | 'width'> & {
  iconNode: TIconNode
  /**
   * The movement of the icon. Built-in icons choose their own. The icon moves when the control
   * around it is marked with `data-icon-trigger` and is hovered, focused, or pressed.
   */
  motion?: TIconMotion | undefined
  /** Plays the movement while `true`, and once when the icon appears with it set. */
  animate?: boolean | undefined
  /** Width and height of the icon in pixels, or any CSS length. Defaults to 24. */
  size?: number | string
}

export interface TCreateIconOptions {
  name: string
  iconNode: TIconNode
  /** The movement of the icon. Defaults to the movement the built-in set gives this name. */
  motion?: TIconMotion | undefined
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
