import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react'

import { Minus, Plus } from '../../icons/index.js'
import { classNames } from '../../internal/helpers/class-names.js'
import { omitUndefined } from '../../internal/helpers/omit-undefined.js'
import { Button } from '../button/button.js'
import { Field } from '../field/field.js'

import './number-field.css'

/** Props for an input of numbers with buttons that step the value, and an optional label and help. */
export type TNumberFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'max' | 'min' | 'onChange' | 'size' | 'step' | 'type' | 'value'
> & {
  /** Lets the mouse wheel step the value while the field has the focus. Defaults to `false`. */
  allowWheelScrub?: boolean | undefined
  /** Where the step buttons are: one at each side, both after the number, or none. Defaults to `sides`. */
  controls?: 'sides' | 'end' | 'none' | undefined
  /** Name of the button that lowers the value. Defaults to `Decrease`. */
  decrementLabel?: string | undefined
  /** Number at the start, in uncontrolled mode. */
  defaultValue?: number | undefined
  /** Helper text associated with the field for assistive technologies. */
  description?: ReactNode | undefined
  /** Error message associated with the field; also marks it as invalid. */
  error?: ReactNode | undefined
  /** How the number is written, such as a currency or a percent. */
  format?: Intl.NumberFormatOptions | undefined
  /** Name of the button that raises the value. Defaults to `Increase`. */
  incrementLabel?: string | undefined
  /** Marks the field as invalid even when no error is displayed. */
  invalid?: boolean | undefined
  /** Visible label of the field. */
  label?: ReactNode | undefined
  /** How much Page Up, Page Down, and Shift with the arrows change the value. Defaults to `10`. */
  largeStep?: number | undefined
  /** Language and region used to write and read the number. Defaults to the browser's. */
  locale?: Intl.LocalesArgument | undefined
  /** Highest number allowed. */
  max?: number | undefined
  /** Lowest number allowed. */
  min?: number | undefined
  /** Called with the new number every time it changes. It is `null` when the field is empty. */
  onValueChange?: ((value: number | null) => void) | undefined
  /** Called when people finish changing the number: they leave the field or release a button. */
  onValueCommitted?: ((value: number | null) => void) | undefined
  /** How much the arrows change the value while Alt is held. Defaults to `0.1`. */
  smallStep?: number | undefined
  /** How much the buttons and the arrows change the value. Defaults to `1`. */
  step?: number | undefined
  /** Number in controlled mode. `null` is an empty field. */
  value?: number | null | undefined
}

/**
 * Renders an input of numbers with buttons that step the value. The number is written with the
 * `format` and the `locale` given, kept between `min` and `max`, and changed with the arrow keys.
 * It forwards its ref to the native input. It is built on Base UI.
 */
export const NumberField = forwardRef<HTMLInputElement, TNumberFieldProps>(function NumberField(
  {
    allowWheelScrub,
    className,
    controls = 'sides',
    decrementLabel = 'Decrease',
    defaultValue,
    description,
    disabled,
    error,
    form,
    format,
    id,
    incrementLabel = 'Increase',
    invalid = false,
    label,
    largeStep,
    locale,
    max,
    min,
    name,
    onValueChange,
    onValueCommitted,
    readOnly,
    required,
    smallStep,
    step,
    value,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const invalidState = invalid || Boolean(error)
  const decrement = (
    <BaseNumberField.Decrement
      render={
        <Button
          aria-label={decrementLabel}
          className="frontier-number-field__button"
          size="icon-small"
          variant="ghost"
        />
      }
    >
      <Minus aria-hidden="true" />
    </BaseNumberField.Decrement>
  )
  const increment = (
    <BaseNumberField.Increment
      render={
        <Button
          aria-label={incrementLabel}
          className="frontier-number-field__button"
          size="icon-small"
          variant="ghost"
        />
      }
    >
      <Plus aria-hidden="true" />
    </BaseNumberField.Increment>
  )

  return (
    <Field.Root
      data-invalid={invalidState || undefined}
      data-readonly={readOnly ? true : undefined}
      disabled={disabled}
      invalid={invalidState}
    >
      {label && <Field.Label>{label}</Field.Label>}
      <BaseNumberField.Root
        {...omitUndefined({
          allowWheelScrub,
          defaultValue,
          disabled,
          form,
          format,
          largeStep,
          locale,
          max,
          min,
          name,
          readOnly,
          required,
          smallStep,
          step,
          value,
        })}
        id={inputId}
        onValueChange={(next) => {
          onValueChange?.(next)
        }}
        onValueCommitted={(next) => {
          onValueCommitted?.(next)
        }}
      >
        <Field.Box
          className={classNames(
            'frontier-number-field__box',
            `frontier-number-field__box--${controls}`,
          )}
        >
          {controls === 'sides' && decrement}
          <BaseNumberField.Input
            {...omitUndefined(props)}
            ref={ref}
            aria-invalid={invalidState || undefined}
            className={classNames('frontier-field__control', 'frontier-number-field', className)}
          />
          {controls === 'end' && decrement}
          {controls !== 'none' && increment}
        </Field.Box>
      </BaseNumberField.Root>
      {description && <Field.Description>{description}</Field.Description>}
      {error && (
        <Field.Error match aria-live="polite">
          {error}
        </Field.Error>
      )}
    </Field.Root>
  )
})
