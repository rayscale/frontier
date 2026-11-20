import type { HTMLAttributes, ReactNode } from 'react'

/** Padding applied to the card's root container. */
export type TCardPadding = 'default' | 'none'

/** Props for {@link Card}, in addition to native `div` attributes. */
export type TCardProps = HTMLAttributes<HTMLElement> & {
  /** Content of the card. */
  children?: ReactNode | undefined
  /** Semantic element to render. Defaults to `div`. */
  as?: 'div' | 'section' | 'article' | undefined
  /**
   * Inner padding. Use `none` when content, such as a ScrollArea, should
   * sit flush with the card edges.
   */
  padding?: TCardPadding | undefined
}

/** Props for {@link CardHeader}, in addition to native `div` attributes. */
export type TCardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  /** Header content, usually a title and description. */
  children?: ReactNode | undefined
}

/** Props for {@link CardTitle}, in addition to native heading attributes. */
export type TCardTitleProps = HTMLAttributes<HTMLElement> & {
  /** Title text. */
  children?: ReactNode | undefined
  /** Element to render. Defaults to `h3`. */
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | undefined
}

/** Props for {@link CardDescription}, in addition to native attributes. */
export type TCardDescriptionProps = HTMLAttributes<HTMLElement> & {
  /** Description text. */
  children?: ReactNode | undefined
  /** Element to render. Defaults to `p`. */
  as?: 'p' | 'div' | undefined
}

/** Props for {@link CardContent}, in addition to native `div` attributes. */
export type TCardContentProps = HTMLAttributes<HTMLDivElement> & {
  /** Main content of the card. */
  children?: ReactNode | undefined
}

/** Props for {@link CardFooter}, in addition to native `div` attributes. */
export type TCardFooterProps = HTMLAttributes<HTMLDivElement> & {
  /** Footer content, usually actions. */
  children?: ReactNode | undefined
}
