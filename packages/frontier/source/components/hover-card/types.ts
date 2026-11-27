import type { HTMLAttributes, ReactElement, ReactNode } from 'react'

/** Side of the trigger where the card is placed. */
export type THoverCardSide = 'top' | 'right' | 'bottom' | 'left'

/** Alignment of the card along the chosen side. */
export type THoverCardAlign = 'start' | 'center' | 'end'

/** Props for the {@link HoverCard} root component. */
export interface THoverCardProps {
  /** Hover card parts: `HoverCard.Trigger` and `HoverCard.Content`. */
  children?: ReactNode | undefined
  /** Time to wait after the pointer leaves the trigger and the card before it closes, in milliseconds. Defaults to `200`. */
  closeDelay?: number | undefined
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the card opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** Controlled open state. Omit to let the hover card manage its own state. */
  open?: boolean | undefined
  /** Time to wait after the pointer enters or the trigger gets focus before the card opens, in milliseconds. Defaults to `400`. */
  openDelay?: number | undefined
}

/** Props for `HoverCard.Trigger`. */
export interface THoverCardTriggerProps {
  /** A single element that opens the card when it is hovered or focused. */
  children: ReactElement
}

/** Props for `HoverCard.Content`, which renders the card. */
export type THoverCardContentProps = HTMLAttributes<HTMLDivElement> & {
  /** Alignment along the chosen side. Defaults to `center`. */
  align?: THoverCardAlign | undefined
  /** Distance in pixels to shift the card along the aligned edge. Defaults to `0`. */
  alignOffset?: number | undefined
  /** Side of the trigger where the card appears. Defaults to `bottom`. */
  side?: THoverCardSide | undefined
  /** Distance in pixels between the trigger and the card. Defaults to `8`. */
  sideOffset?: number | undefined
}
