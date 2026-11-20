import { AccordionItem } from './parts/item.js'
import { AccordionRoot } from './parts/root.js'
import type { TAccordionProps } from './types.js'

import './accordion.css'

export type {
  TAccordionItemProps,
  TAccordionMultipleProps,
  TAccordionProps,
  TAccordionSingleProps,
} from './types.js'

export interface TAccordionComponent extends React.FC<TAccordionProps> {
  /**
   * Root component that manages the expansion state. Use `type="single"` for
   * a single open item or `type="multiple"` for multiple.
   */
  Root: typeof AccordionRoot
  /**
   * A single expandable section of an {@link Accordion}.
   */
  Item: typeof AccordionItem
}

/** Compound accordion: `Accordion` is the root and `Accordion.Item` its items. */
export const Accordion: TAccordionComponent = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
})
