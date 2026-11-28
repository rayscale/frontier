import type { HTMLAttributes, ReactElement, ReactNode } from 'react'

/** Axis along which the card follows the cursor. */
export type TCursorCardAxis = 'both' | 'x' | 'y'

/** Side of the cursor where the card is placed. */
export type TCursorCardSide = 'top' | 'right' | 'bottom' | 'left'

/** Alignment of the card along the chosen side. */
export type TCursorCardAlign = 'start' | 'center' | 'end'

/** Where the cursor is inside the zone, in pixels from its top left corner. */
export interface TCursorCardPosition {
  /** Height of the zone. */
  readonly height: number
  /** Width of the zone. */
  readonly width: number
  /** Distance from the left edge of the zone. */
  readonly x: number
  /** Distance from the top edge of the zone. */
  readonly y: number
}

/** Props for the {@link CursorCard} root component. */
export interface TCursorCardProps {
  /** Cursor card parts: `CursorCard.Zone` and `CursorCard.Content`. */
  children?: ReactNode | undefined
  /** Time to wait after the cursor leaves the zone before the card closes, in milliseconds. Defaults to `0`. */
  closeDelay?: number | undefined
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Prevents the card from opening. Defaults to `false`. */
  disabled?: boolean | undefined
  /** Axis along which the card follows the cursor. `x` and `y` keep the card level or in line with the zone. Defaults to `both`. */
  followAxis?: TCursorCardAxis | undefined
  /** Called with the requested open state when the card opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** Controlled open state. Omit to let the cursor card manage its own state. */
  open?: boolean | undefined
  /** Time to wait after the cursor enters the zone before the card opens, in milliseconds. Defaults to `0`. */
  openDelay?: number | undefined
}

/** Props for `CursorCard.Zone`. */
export interface TCursorCardZoneProps {
  /** A single element that becomes the zone where the card follows the cursor. */
  children: ReactElement
}

/** Props for `CursorCard.Content`, which renders the card. */
export type TCursorCardContentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Alignment along the chosen side. Defaults to `start`. */
  align?: TCursorCardAlign | undefined
  /** Distance in pixels to shift the card along the aligned edge. Defaults to `0`. */
  alignOffset?: number | undefined
  /** Content of the card, or a function that receives the cursor position inside the zone. */
  children?: ReactNode | ((position: TCursorCardPosition) => ReactNode) | undefined
  /** Side of the cursor where the card appears. Defaults to `bottom`. */
  side?: TCursorCardSide | undefined
  /** Distance in pixels between the cursor and the card. Defaults to `12`. */
  sideOffset?: number | undefined
}
