import type { HTMLAttributes } from 'react'

/** Day of the week, where `0` is Sunday and `6` is Saturday. */
export type TCalendarDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

/** Props for {@link Calendar}, in addition to native `div` attributes. */
export type TCalendarProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> & {
  /** Selected date for controlled use. `null` means no date is selected. Omit it to let the calendar manage its own selection. */
  value?: Date | null | undefined
  /** Selected date when uncontrolled. Defaults to no selection. */
  defaultValue?: Date | null | undefined
  /** Called with the newly selected date. Not called when the selected date is chosen again. */
  onValueChange?: ((date: Date) => void) | undefined
  /** Visible month for controlled use. Only its year and month are used. */
  month?: Date | undefined
  /** Visible month when uncontrolled. Defaults to the month of `defaultValue`, or the current month. */
  defaultMonth?: Date | undefined
  /** Called with the first day of the newly visible month. */
  onMonthChange?: ((month: Date) => void) | undefined
  /** Earliest selectable date. Earlier dates are disabled and navigation stops before its month. */
  minDate?: Date | undefined
  /** Latest selectable date. Later dates are disabled and navigation stops after its month. */
  maxDate?: Date | undefined
  /** Prevents any interaction with the calendar. Defaults to `false`. */
  disabled?: boolean | undefined
  /** Returns `true` for dates that cannot be selected. */
  isDateDisabled?: ((date: Date) => boolean) | undefined
  /** First day of each week. Defaults to `0` (Sunday). */
  weekStartsOn?: TCalendarDayOfWeek | undefined
  /** BCP 47 locale for month, weekday, and date labels. Defaults to the user's locale. */
  locale?: string | undefined
  /**
   * First day of a range to highlight. The highlight is separate from `value`,
   * so a range picker can pass `value={null}` and handle each day press itself.
   */
  rangeStart?: Date | null | undefined
  /**
   * Last day of a range to highlight. While it is `null` and `rangeStart` is
   * set, hovering an enabled day on or after `rangeStart` previews the range.
   */
  rangeEnd?: Date | null | undefined
}
