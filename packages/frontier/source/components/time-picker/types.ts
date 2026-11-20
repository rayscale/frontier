import type { ButtonHTMLAttributes } from 'react'

/** Display format for the trigger and the popup. */
export type TTimePickerFormat = '12h' | '24h'

/**
 * Props for {@link TimePicker}, in addition to native `button` attributes.
 *
 * Values use the normalized `HH:mm` 24-hour string format, for example
 * `"09:30"` or `"23:05"`, regardless of `format`.
 */
export type TTimePickerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'defaultValue' | 'type' | 'value'
> & {
  /** Selected time as `HH:mm` for controlled use. `null` or an invalid string shows the placeholder. Omit it to let the picker manage its own selection. */
  value?: string | null | undefined
  /** Selected time as `HH:mm` when uncontrolled. Defaults to no selection. */
  defaultValue?: string | null | undefined
  /** Called with the newly selected time as `HH:mm`. Not called when the selection is unchanged. */
  onValueChange?: ((time: string) => void) | undefined
  /** Controlled open state of the popup. Omit it to let the picker manage its own state. */
  open?: boolean | undefined
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the popup opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** Prevents interaction. The trigger is disabled and the popup cannot open. */
  disabled?: boolean | undefined
  /** Shows the selected time without allowing a change. The popup cannot open. */
  readOnly?: boolean | undefined
  /** Text shown in the trigger when no time is selected. Defaults to `Select a time`. */
  placeholder?: string | undefined
  /** Hour display. `24h` shows 00 to 23 without a period column. `12h` shows 1 to 12 with an AM/PM column. Defaults to `24h`. */
  format?: TTimePickerFormat | undefined
  /** Minute increment offered in the popup. Must be a whole number that divides 60. Defaults to `1`. */
  minuteStep?: number | undefined
  /** Earliest selectable time as `HH:mm`, inclusive. */
  minTime?: string | undefined
  /** Latest selectable time as `HH:mm`, inclusive. Must not be earlier than `minTime`. Ranges that cross midnight are not supported. */
  maxTime?: string | undefined
  /** BCP 47 locale used for the AM and PM labels. Defaults to the runtime locale. */
  locale?: string | undefined
}

export type TPeriod = 'am' | 'pm'

export interface TTimeConstraints {
  step: number
  min?: number | undefined
  max?: number | undefined
}

export type TDayPeriodLabels = { [TKey in TPeriod]: string }
