import type { ButtonHTMLAttributes } from 'react'

import type { TCalendarDayOfWeek } from '../calendar/calendar.js'

/** A selected date range. Either bound is `null` while it is not chosen. */
export interface TDateRange {
  start: Date | null
  end: Date | null
}

/** Props for {@link DateRangePicker}, in addition to native `button` attributes. */
export type TDateRangePickerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'defaultValue' | 'type' | 'value'
> & {
  /** Selected range for controlled use. Omit it to let the picker manage its own selection. */
  value?: TDateRange | undefined
  /** Selected range when uncontrolled. Defaults to no selection. */
  defaultValue?: TDateRange | undefined
  /** Called with the new range each time a range is completed or cleared. */
  onValueChange?: ((range: TDateRange) => void) | undefined
  /** Controlled open state of the calendar popup. Omit it to let the picker manage its own state. */
  open?: boolean | undefined
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the calendar opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** Prevents interaction. The trigger is disabled and the calendar cannot open. */
  disabled?: boolean | undefined
  /** Shows the selected range without allowing a change. The calendar cannot open. */
  readOnly?: boolean | undefined
  /** Shows a button that clears the selected range. */
  clearable?: boolean | undefined
  /** Earliest selectable date. Only its calendar day is used. */
  minDate?: Date | undefined
  /** Latest selectable date. Only its calendar day is used. */
  maxDate?: Date | undefined
  /** Returns `true` for dates that cannot be selected. A range cannot span them. */
  isDateDisabled?: ((date: Date) => boolean) | undefined
  /** Text shown in the trigger when no range is selected. Defaults to `Select a date range`. */
  placeholder?: string | undefined
  /** BCP 47 locale used to format the dates and the calendar. Defaults to the runtime locale. */
  locale?: string | undefined
  /** First day of the week in the calendar, from `0` (Sunday) to `6` (Saturday). */
  weekStartsOn?: TCalendarDayOfWeek | undefined
  /** Formats each date in the trigger. Replaces the default locale-aware format. */
  formatDate?: ((date: Date) => string) | undefined
}
