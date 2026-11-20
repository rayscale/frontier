import type { ComponentPropsWithoutRef, ReactNode } from 'react'

/** Size of the page controls. */
export type TPaginationSize = 'small' | 'medium'

/** Props for the {@link Pagination} root, rendered as a navigation landmark. */
export type TPaginationProps = Omit<ComponentPropsWithoutRef<'nav'>, 'children'> & {
  /** The current page, counted from 1. Values outside the range are clamped for display only. */
  page: number
  /** Total number of pages. Zero hides the page numbers. */
  pageCount: number
  /** Called with the requested page. It is never called for the current page or an out-of-range page. */
  onPageChange?: ((page: number) => void) | undefined
  /** Number of page numbers shown on each side of the current page. Defaults to 1. */
  siblingCount?: number | undefined
  /** Adds first and last page controls to the default layout. */
  showFirstLast?: boolean | undefined
  /** Prevents every page change. */
  disabled?: boolean | undefined
  /** Size of the page controls. Defaults to `medium`. */
  size?: TPaginationSize | undefined
  /** Replaces the default layout with composed parts. */
  children?: ReactNode | undefined
}

/** Props for the navigation and page controls, which render native buttons. */
export type TPaginationControlProps = ComponentPropsWithoutRef<'button'>

/** Props for `Pagination.Items`, the numbered pages and ellipses. */
export type TPaginationItemsProps = ComponentPropsWithoutRef<'div'>
