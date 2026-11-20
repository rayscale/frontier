import type { ComponentPropsWithoutRef, ReactNode } from 'react'

/** A numeric value or multiple values for a multi-thumb slider. */
export type TSliderValue = number | readonly number[]

/** A decorative tick on the slider track. Marks do not change step behavior. */
export type TSliderMark = number | { value: number; label?: ReactNode }

/** Props for a single-value or range slider. */
export type TSliderProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  | 'aria-orientation'
  | 'aria-valuemax'
  | 'aria-valuemin'
  | 'aria-valuenow'
  | 'children'
  | 'defaultValue'
  | 'onChange'
> & {
  /** Helper text associated with the slider for assistive technologies. */
  description?: ReactNode | undefined
  /** TValue selected initially when the slider is uncontrolled. */
  defaultValue?: TSliderValue | undefined
  /** Disables interaction with the slider. Defaults to `false`. */
  disabled?: boolean | undefined
  /** Message associated with an invalid slider. */
  error?: ReactNode | undefined
  /** Options used to format numeric values with `Intl.NumberFormat`. */
  format?: Intl.NumberFormatOptions | undefined
  /** Form identifier when the slider is submitted. */
  form?: string | undefined
  /** Returns a display and accessible value string for each numeric value. */
  formatValue?: ((value: number) => string) | undefined
  /** Visible label associated with the slider. */
  label?: ReactNode | undefined
  /** Maximum allowed value. Defaults to `100`. */
  max?: number | undefined
  /** Minimum allowed value. Defaults to `0`. */
  min?: number | undefined
  /** Minimum distance between range thumbs, in steps. Defaults to `0`. */
  minStepsBetweenValues?: number | undefined
  /** Visible marks. A numeric mark is displayed without a label. */
  marks?: readonly TSliderMark[] | undefined
  /** Adds marks at this interval, including the minimum and maximum. */
  markInterval?: number | undefined
  /** Form name used when the slider is submitted. */
  name?: string | undefined
  /** Called with the new numeric value or range when the slider changes. */
  onValueChange?: ((value: TSliderValue) => void) | undefined
  /** Called when the value is committed after an interaction. */
  onValueCommitted?: ((value: TSliderValue) => void) | undefined
  /** Horizontal by default; vertical sliders are supported. */
  orientation?: 'horizontal' | 'vertical' | undefined
  /** Disables interaction without removing the current value from forms. */
  readOnly?: boolean | undefined
  /** Marks the slider as required for assistive technology. */
  required?: boolean | undefined
  /** Distance between selectable values. Defaults to `1`. */
  step?: number | undefined
  /** Displays the current value beside the label. Defaults to `false`. */
  showValue?: boolean | undefined
  /** Thumb labels, in value order, for range sliders. */
  thumbLabels?: readonly string[] | undefined
  /** How thumbs align at the endpoints. Defaults to `center`. */
  thumbAlignment?: 'center' | 'edge' | 'edge-client-only' | undefined
  /** How range thumbs behave when they collide. Defaults to `push`. */
  thumbCollisionBehavior?: 'push' | 'swap' | 'none' | undefined
  /** Locale passed to `Intl.NumberFormat`. */
  locale?: Intl.LocalesArgument | undefined
  /** Larger keyboard increment. Defaults to `10`. */
  largeStep?: number | undefined
  /** Marks the slider as invalid even when no error is displayed. */
  invalid?: boolean | undefined
  /** Current value when the slider is controlled. */
  value?: TSliderValue | undefined
}
