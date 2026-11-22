import type { HTMLAttributes, ReactNode } from 'react'

/** Visual presentation of the empty state container. */
export type TEmptyVariant = 'default' | 'outline' | 'surface'

/** Density of the empty state container. */
export type TEmptySize = 'compact' | 'default' | 'spacious'

/** Media presentation. `icon` wraps an icon in a restrained container. */
export type TEmptyMediaVariant = 'default' | 'icon'

export type TEmptyRootProps = HTMLAttributes<HTMLDivElement> & {
  /** Content of the empty state, usually a header and content region. */
  children?: ReactNode | undefined
  /** Visual presentation. Defaults to `default`, which is borderless. */
  variant?: TEmptyVariant | undefined
  /** Density of the layout. Defaults to `default`. */
  size?: TEmptySize | undefined
}

export type TEmptyHeaderProps = HTMLAttributes<HTMLDivElement> & {
  /** Media, title, and description. */
  children?: ReactNode | undefined
}

export type TEmptyMediaProps = HTMLAttributes<HTMLDivElement> & {
  /** Icon or custom visual content, such as an illustration or avatar. */
  children?: ReactNode | undefined
  /** Use `icon` for an icon inside a restrained container. */
  variant?: TEmptyMediaVariant | undefined
}

export type TEmptyTitleProps = HTMLAttributes<HTMLElement> & {
  /** Title text. */
  children?: ReactNode | undefined
  /** Heading element to render. Defaults to `h3`. */
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | undefined
}

export type TEmptyDescriptionProps = HTMLAttributes<HTMLElement> & {
  /** Description content. Inline links are supported. */
  children?: ReactNode | undefined
  /** Element to render. Defaults to `p`. Use `div` for block content. */
  as?: 'p' | 'div' | undefined
}

export type TEmptyContentProps = HTMLAttributes<HTMLDivElement> & {
  /** Actions or supplementary content. */
  children?: ReactNode | undefined
}
