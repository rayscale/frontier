import type { FC } from 'react'

import { HoverCardContent } from './parts/content.js'
import { HoverCardRoot, HoverCardTrigger } from './parts/root.js'
import type { THoverCardProps } from './types.js'

import '../../internal/styles/floating-surface.css'
import './hover-card.css'

export type {
  THoverCardAlign,
  THoverCardContentProps,
  THoverCardProps,
  THoverCardSide,
  THoverCardTriggerProps,
} from './types.js'

export interface THoverCardComponent extends FC<THoverCardProps> {
  /** The element that opens the card when it is hovered or focused. */
  Trigger: typeof HoverCardTrigger
  /** The card shown beside the trigger. People can move the pointer into it. */
  Content: typeof HoverCardContent
}

/**
 * Shows extra information about an element in a card that opens when the pointer enters it or it
 * gets keyboard focus. The card stays open while the pointer is over it. Compose it with
 * `HoverCard.Trigger` and `HoverCard.Content`.
 */
export const HoverCard: THoverCardComponent = Object.assign(HoverCardRoot, {
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
})
