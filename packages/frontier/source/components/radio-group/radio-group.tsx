import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import { RadioGroupItem } from './parts/radio-group-item.js'
import { RadioGroupRoot } from './parts/radio-group-root.js'
import type { TRadioGroupProps } from './types.js'

import './radio-group.css'

export interface TRadioGroupComponent extends ForwardRefExoticComponent<
  TRadioGroupProps & RefAttributes<HTMLFieldSetElement>
> {
  /** Renders one option in the group. Its `value` is what the group selects and submits. */
  Item: typeof RadioGroupItem
}

/** Collects one value out of several, with a group label and native radio options. */
export const RadioGroup: TRadioGroupComponent = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
})
