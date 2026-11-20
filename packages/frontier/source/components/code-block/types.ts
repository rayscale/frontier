import type { HTMLAttributes, ReactNode } from 'react'

import type { TCopyButtonProps } from '../copy-button/types.js'

/** Tone of the code block. */
export type TCodeBlockVariant = 'default' | 'destructive'

/** Density of the code block. */
export type TCodeBlockSize = 'default' | 'sm'

/** Meaning of a single code line. */
export type TCodeBlockLineVariant = 'default' | 'added' | 'removed' | 'highlighted'

export type TCodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  /** Tone of the block. Defaults to `default`. */
  variant?: TCodeBlockVariant | undefined
  /** Density of the block. Defaults to `default`. */
  size?: TCodeBlockSize | undefined
}

export type TCodeBlockHeaderProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode | undefined
}

export type TCodeBlockTitleProps = HTMLAttributes<HTMLElement> & {
  /** Element to render. Defaults to a `div`. */
  as?: 'div' | 'span' | 'p' | 'h2' | 'h3' | 'h4' | undefined
  children?: ReactNode | undefined
}

export type TCodeBlockActionsProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode | undefined
}

export type TCodeBlockCopyButtonProps = TCopyButtonProps

export type TCodeBlockContentProps = Omit<HTMLAttributes<HTMLPreElement>, 'children'> & {
  /** A code string or a list of `CodeBlock.Line` elements. */
  children: ReactNode | string
  /** Wraps long lines instead of scrolling. */
  wrap?: boolean | undefined
  /** Numbers each line when `children` is a string. */
  lineNumbers?: boolean | undefined
  /** Number of the first line. Defaults to `1`. */
  startLine?: number | undefined
  /** Makes the content focusable for keyboard scrolling. Defaults to `0`. */
  tabIndex?: number | undefined
}

export type TCodeBlockLineProps = HTMLAttributes<HTMLSpanElement> & {
  /** Meaning of the line. Defaults to `default`. */
  variant?: TCodeBlockLineVariant | undefined
  children?: ReactNode | undefined
}

export type TCodeBlockFooterProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode | undefined
}
