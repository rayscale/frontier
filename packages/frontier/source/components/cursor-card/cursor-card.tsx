import type { FC } from 'react'

import { CursorCardContent } from './parts/content.js'
import { CursorCardRoot, CursorCardZone } from './parts/root.js'
import type { TCursorCardProps } from './types.js'

import '../../internal/styles/floating-surface.css'
import './cursor-card.css'

export type {
  TCursorCardAlign,
  TCursorCardAxis,
  TCursorCardContentProps,
  TCursorCardPosition,
  TCursorCardProps,
  TCursorCardSide,
  TCursorCardZoneProps,
} from './types.js'

export interface TCursorCardComponent extends FC<TCursorCardProps> {
  /** The element that opens the card when the cursor enters it. The card follows the cursor inside it. */
  Zone: typeof CursorCardZone
  /** The card that moves with the cursor. It can read the cursor position inside the zone. */
  Content: typeof CursorCardContent
}

/**
 * Shows a card that opens when the cursor enters a zone and moves with the cursor while it stays
 * inside. Compose it with `CursorCard.Zone` and `CursorCard.Content`.
 */
export const CursorCard: TCursorCardComponent = Object.assign(CursorCardRoot, {
  Zone: CursorCardZone,
  Content: CursorCardContent,
})
