import { forwardRef, useId, useMemo, useState } from 'react'

import { CalendarRange, X } from '../../icons/index.js'
import { resolveLabelledBy } from '../../internal/helpers/resolve-labelled-by.js'
import { Calendar } from '../calendar/calendar.js'
import { Popover } from '../popover/popover.js'

import { compareDays, emptyRange, isSpanOpen } from './helpers/range.js'
import type { TDateRange, TDateRangePickerProps } from './types.js'

import './date-range-picker.css'

export type { TDateRange, TDateRangePickerProps } from './types.js'

/**
 * A date range field that opens a range {@link Calendar} in a {@link Popover}.
 * The first click picks the start date and the second picks the end date. The
 * range is reported and the calendar closes once both dates are chosen.
 */
export const DateRangePicker = forwardRef<HTMLButtonElement, TDateRangePickerProps>(
  function DateRangePicker(
    {
      value: valueProp,
      defaultValue = emptyRange,
      onValueChange,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      readOnly = false,
      clearable = false,
      minDate,
      maxDate,
      isDateDisabled,
      placeholder = 'Select a date range',
      locale,
      weekStartsOn,
      formatDate,
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref,
  ) {
    const labelId = useId()
    const valueId = useId()
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const [pendingStart, setPendingStart] = useState<Date | null>(null)

    const valueControlled = valueProp !== undefined
    const value = valueControlled ? valueProp : internalValue
    const interactive = !disabled && !readOnly
    const openState = interactive && (openProp ?? internalOpen)

    const formatter = useMemo(
      () => new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }),
      [locale],
    )
    const formatDay = (day: Date) => formatDate?.(day) ?? formatter.format(day)
    const displayStart = pendingStart ?? value.start
    const displayEnd = pendingStart ? null : value.end
    const anchor = pendingStart ?? (value.end ? null : value.start)
    const selection = pendingStart !== null || value.start !== null || value.end !== null

    let displayText = placeholder

    if (displayStart) {
      displayText = displayEnd
        ? `${formatDay(displayStart)} – ${formatDay(displayEnd)}`
        : formatDay(displayStart)
    }

    const isBlocked = (day: Date) =>
      (minDate !== undefined && compareDays(day, minDate) < 0) ||
      (maxDate !== undefined && compareDays(day, maxDate) > 0) ||
      isDateDisabled?.(day) === true

    const setOpen = (nextOpen: boolean) => {
      if (!interactive) {
        return
      }

      if (!nextOpen) {
        setPendingStart(null)
      }

      if (openProp === undefined) {
        setInternalOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    }

    const commit = (range: TDateRange) => {
      if (!valueControlled) {
        setInternalValue(range)
      }

      setPendingStart(null)
      onValueChange?.(range)
    }

    const handlePick = (day: Date) => {
      if (anchor === null || compareDays(day, anchor) < 0 || !isSpanOpen(anchor, day, isBlocked)) {
        setPendingStart(day)
        return
      }

      commit({ start: anchor, end: day })
      setOpen(false)
    }

    const handleClear = () => {
      commit(emptyRange)
    }

    const classes = ['frontier-date-range-picker__trigger', className].filter(Boolean).join(' ')
    const labelledBy = resolveLabelledBy(ariaLabel, ariaLabelledBy, labelId, valueId)

    return (
      <>
        {ariaLabel && (
          <span id={labelId} hidden>
            {ariaLabel}
          </span>
        )}
        <div className="frontier-date-range-picker">
          <Popover open={openState} onOpenChange={setOpen}>
            <Popover.Trigger>
              <button
                {...props}
                ref={ref}
                type="button"
                disabled={disabled}
                className={classes}
                aria-labelledby={labelledBy}
                data-readonly={readOnly || undefined}
              >
                <span className="frontier-date-range-picker__icon" aria-hidden="true">
                  <CalendarRange />
                </span>
                <span
                  id={valueId}
                  className="frontier-date-range-picker__value"
                  data-placeholder={selection ? undefined : ''}
                >
                  {displayStart && displayEnd ? (
                    <>
                      {formatDay(displayStart)}
                      <span className="frontier-date-range-picker__separator">{' – '}</span>
                      {formatDay(displayEnd)}
                    </>
                  ) : (
                    displayText
                  )}
                </span>
              </button>
            </Popover.Trigger>
            <Popover.Content aria-label="Choose date range" align="start">
              <Calendar
                value={null}
                onValueChange={handlePick}
                rangeStart={displayStart}
                rangeEnd={displayEnd}
                defaultMonth={displayStart ?? undefined}
                minDate={minDate}
                maxDate={maxDate}
                isDateDisabled={isDateDisabled}
                locale={locale}
                weekStartsOn={weekStartsOn}
              />
            </Popover.Content>
          </Popover>
          {clearable && interactive && selection && (
            <button
              type="button"
              className="frontier-date-range-picker__clear"
              aria-label="Clear date range"
              onClick={handleClear}
            >
              <X aria-hidden="true" />
            </button>
          )}
        </div>
      </>
    )
  },
)
