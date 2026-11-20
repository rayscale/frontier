import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import {
  CalloutActions,
  CalloutContent,
  CalloutRoot,
  CalloutSymbol,
  CalloutTitle,
} from './parts/sections.js'
import type { TCalloutProps } from './types.js'

import './callout.css'

export type {
  TCalloutActionsProps,
  TCalloutContentProps,
  TCalloutProps,
  TCalloutRole,
  TCalloutSymbolProps,
  TCalloutTitleProps,
  TCalloutTone,
} from './types.js'

export interface TCalloutComponent extends ForwardRefExoticComponent<
  TCalloutProps & RefAttributes<HTMLDivElement>
> {
  /** Renders the decorative symbol that introduces the message. */
  Symbol: typeof CalloutSymbol
  /** Groups the title and body of the message. */
  Content: typeof CalloutContent
  /** Renders the message title. Defaults to a paragraph. */
  Title: typeof CalloutTitle
  /** Holds optional actions such as a link or a dismiss button. */
  Actions: typeof CalloutActions
}

/**
 * Renders a persistent inline message with a semantic tone. Compose it with
 * `Callout.Symbol`, `Callout.Content`, `Callout.Title`, and `Callout.Actions`.
 */
export const Callout: TCalloutComponent = Object.assign(CalloutRoot, {
  Actions: CalloutActions,
  Content: CalloutContent,
  Symbol: CalloutSymbol,
  Title: CalloutTitle,
})
