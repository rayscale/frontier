import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import { ControlGroupRoot } from './parts/root.js'
import { ControlGroupSeparator, ControlGroupText } from './parts/sections.js'
import type { TControlGroupProps } from './types.js'

import './control-group.css'

export type {
  TControlGroupOrientation,
  TControlGroupProps,
  TControlGroupSeparatorProps,
  TControlGroupTextProps,
} from './types.js'

export interface TControlGroupComponent extends ForwardRefExoticComponent<
  TControlGroupProps & RefAttributes<HTMLDivElement>
> {
  /** Renders a divider between grouped controls. */
  Separator: typeof ControlGroupSeparator
  /** Renders supporting text as part of the group. */
  Text: typeof ControlGroupText
}

/** Compound group for visually and semantically related actions and controls. */
export const ControlGroup: TControlGroupComponent = Object.assign(ControlGroupRoot, {
  Separator: ControlGroupSeparator,
  Text: ControlGroupText,
})
