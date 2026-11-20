import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import { FieldsetLegend, FieldsetRoot } from './parts/root.js'
import type { TFieldsetRootProps } from './types.js'

import './fieldset.css'

export type { TFieldsetLegendProps, TFieldsetRootProps } from './types.js'

export interface TFieldsetComponent extends ForwardRefExoticComponent<
  TFieldsetRootProps & RefAttributes<HTMLFieldSetElement>
> {
  /** Root fieldset container grouping related controls. */
  Root: typeof FieldsetRoot
  /** Accessible name/legend for the enclosing fieldset. */
  Legend: typeof FieldsetLegend
}

export const Fieldset: TFieldsetComponent = Object.assign(FieldsetRoot, {
  Root: FieldsetRoot,
  Legend: FieldsetLegend,
})
