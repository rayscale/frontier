import type { ReactElement } from 'react'

/** Side of the trigger where the tooltip appears. Inline sides follow the writing direction. */
export type TTooltipSide = 'top' | 'bottom' | 'inline-start' | 'inline-end'

export interface TTooltipProps {
  /** The single element that the tooltip belongs to. It receives hover and focus handling. */
  children: ReactElement
  /** Short plain text. It must repeat what the trigger already exposes as its name or description. */
  content: string
  /** Prevents the tooltip from appearing. */
  disabled?: boolean
  /** Preferred side of the trigger. The tooltip moves to the opposite side when there is no room. */
  side?: TTooltipSide
}
