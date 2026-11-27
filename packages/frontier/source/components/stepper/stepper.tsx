import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import { StepperRoot } from './parts/root.js'
import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperPanel,
  StepperTitle,
} from './parts/sections.js'
import type { TStepperRootProps } from './types.js'

import './stepper.css'

export type {
  TStepperDescriptionProps,
  TStepperIndicatorProps,
  TStepperItemProps,
  TStepperListProps,
  TStepperOrientation,
  TStepperPanelProps,
  TStepperRootProps,
  TStepperStatus,
  TStepperTitleProps,
} from './types.js'

export interface TStepperComponent extends ForwardRefExoticComponent<
  TStepperRootProps & RefAttributes<HTMLDivElement>
> {
  /** Holds the steps and the content of the current step, and shares which step is current. */
  Root: typeof StepperRoot
  /** The ordered list of steps. */
  List: typeof StepperList
  /** One step. It is completed, current, or upcoming depending on the current step. */
  Item: typeof StepperItem
  /** The mark of a step: its number, a check once completed, or the icon you pass. */
  Indicator: typeof StepperIndicator
  /** The name of a step. */
  Title: typeof StepperTitle
  /** Supporting text under the name of a step. */
  Description: typeof StepperDescription
  /** Content that belongs to one step and is shown while that step is current. */
  Panel: typeof StepperPanel
}

/**
 * Shows the steps of a process and where someone is in it, in a row or a column. Compose it with
 * `Stepper.Root`, `Stepper.List`, `Stepper.Item`, and `Stepper.Indicator`, and add `Stepper.Title`,
 * `Stepper.Description`, and `Stepper.Panel` as needed.
 */
export const Stepper: TStepperComponent = Object.assign(StepperRoot, {
  Root: StepperRoot,
  List: StepperList,
  Item: StepperItem,
  Indicator: StepperIndicator,
  Title: StepperTitle,
  Description: StepperDescription,
  Panel: StepperPanel,
})
