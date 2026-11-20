import { CollapsibleContent } from './parts/content.js'
import { CollapsibleRoot } from './parts/root.js'
import { CollapsibleTrigger } from './parts/trigger.js'
import type { TCollapsibleProps } from './types.js'

import './collapsible.css'

export type {
  TCollapsibleContentProps,
  TCollapsibleProps,
  TCollapsibleTriggerProps,
} from './types.js'

export interface TCollapsibleComponent extends React.ForwardRefExoticComponent<
  TCollapsibleProps & React.RefAttributes<HTMLDivElement>
> {
  Root: typeof CollapsibleRoot
  /** Button that toggles the content of its collapsible section. */
  Trigger: typeof CollapsibleTrigger
  /** Region revealed by the collapsible trigger. */
  Content: typeof CollapsibleContent
}

/** Shows and hides a section of content. Compound: `Collapsible.Trigger` toggles `Collapsible.Content`. */
export const Collapsible: TCollapsibleComponent = Object.assign(CollapsibleRoot, {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
})
