import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import { CheckboxGroupItem } from './parts/item.js'
import { CheckboxGroupRoot } from './parts/root.js'
import type { TCheckboxGroupProps } from './types.js'

import './checkbox-group.css'

export type { TCheckboxGroupItemProps, TCheckboxGroupProps } from './types.js'

export interface TCheckboxGroupComponent extends ForwardRefExoticComponent<
  TCheckboxGroupProps & RefAttributes<HTMLFieldSetElement>
> {
  /** Renders an individual checkbox option within the group. */
  Item: typeof CheckboxGroupItem
}

/** Compound checkbox group: `CheckboxGroup` is the root and `CheckboxGroup.Item` its options. */
export const CheckboxGroup: TCheckboxGroupComponent = Object.assign(CheckboxGroupRoot, {
  Item: CheckboxGroupItem,
})
