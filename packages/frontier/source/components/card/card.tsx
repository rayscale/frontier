import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
} from './parts/sections.js'
import type { TCardProps } from './types.js'

import './card.css'

export type {
  TCardContentProps,
  TCardDescriptionProps,
  TCardFooterProps,
  TCardHeaderProps,
  TCardPadding,
  TCardProps,
  TCardTitleProps,
} from './types.js'

export interface TCardComponent extends ForwardRefExoticComponent<
  TCardProps & RefAttributes<HTMLElement>
> {
  /** Renders the header region of a card. */
  Header: typeof CardHeader
  /** Renders the title of a card. Defaults to an `h3` heading. */
  Title: typeof CardTitle
  /** Renders the muted description text of a card. */
  Description: typeof CardDescription
  /** Renders the main content region of a card. */
  Content: typeof CardContent
  /** Renders the footer region of a card, typically for actions. */
  Footer: typeof CardFooter
}

/**
 * Renders a non-interactive surface that groups related content. Compose it
 * with `Card.Header`, `Card.Title`, `Card.Description`, `Card.Content`, and
 * `Card.Footer`.
 */
export const Card: TCardComponent = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})
