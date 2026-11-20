import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import { RadioGroupItem } from './parts/item.js'
import { RadioGroupRoot } from './parts/root.js'
import type { TRadioGroupProps } from './types.js'

import './radio-group.css'

export { RadioGroupItem }

export type {
  TRadioGroupItemProps,
  TRadioGroupOrientation,
  TRadioGroupProps,
  TRadioGroupSize,
} from './types.js'

export interface TRadioGroupComponent extends ForwardRefExoticComponent<
  TRadioGroupProps & RefAttributes<HTMLFieldSetElement>
> {
  /** Renders a native radio option within the group. */
  Item: typeof RadioGroupItem
}

/** Compound radio group: `RadioGroup` is the root and `RadioGroup.Item` its options. */
export const RadioGroup: TRadioGroupComponent = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
})
