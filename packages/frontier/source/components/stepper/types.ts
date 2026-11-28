import type { ComponentPropsWithoutRef } from 'react'

/** Direction in which the steps are laid out. */
export type TStepperOrientation = 'horizontal' | 'vertical'

/** Where a step stands compared with the current one. */
export type TStepperStatus = 'completed' | 'current' | 'upcoming'

/**
 * Props for the element that holds the steps and the content of the current step.
 * The steps are numbered from 1, and a value past the last step marks every step completed.
 */
export type TStepperRootProps = Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue'> & {
  /** Text read before a completed step so people who cannot see its mark hear its state. Defaults to `Completed`. */
  completedLabel?: string | undefined
  /** Step that is current at the start, in uncontrolled mode. Defaults to `1`. */
  defaultValue?: number | undefined
  /** Called with the step a person chose. Passing it makes the steps selectable. */
  onValueChange?: ((value: number) => void) | undefined
  /** Direction in which the steps are laid out. Defaults to `horizontal`. */
  orientation?: TStepperOrientation | undefined
  /** Step that is current, in controlled mode. */
  value?: number | undefined
}

/** Props for the ordered list of steps. Give it an accessible name. */
export type TStepperListProps = ComponentPropsWithoutRef<'ol'>

/** Props for one step. */
export type TStepperItemProps = Omit<ComponentPropsWithoutRef<'li'>, 'value'> & {
  /** Number of the step, starting at 1. */
  value: number
  /** Prevents this step from being selected. */
  disabled?: boolean | undefined
}

/** Props for the mark of a step. Its children replace the step number and the check mark. */
export type TStepperIndicatorProps = ComponentPropsWithoutRef<'span'>

/** Props for the name of a step. */
export type TStepperTitleProps = ComponentPropsWithoutRef<'span'>

/** Props for the supporting text of a step. */
export type TStepperDescriptionProps = ComponentPropsWithoutRef<'span'>

/** Props for the content that belongs to one step. */
export type TStepperPanelProps = ComponentPropsWithoutRef<'div'> & {
  /** Number of the step this content belongs to. It is shown while that step is current. */
  value: number
}
