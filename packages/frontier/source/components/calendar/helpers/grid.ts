import type { TCalendarDayOfWeek } from '../types.js'

import { addDays, clampDate, isSameMonth, startOfMonth } from './date.js'

export interface TCalendarWeekday {
  key: TCalendarDayOfWeek
  short: string
  long: string
}

export const daysPerWeek = 7
const weeksPerMonth = 6
const referenceSunday = new Date(2024, 0, 7)

export function getWeekOffset(date: Date, weekStartsOn: TCalendarDayOfWeek): number {
  return (date.getDay() - weekStartsOn + daysPerWeek) % daysPerWeek
}

/** Always six weeks, so the grid height does not change between months. */
export function getWeeks(month: Date, weekStartsOn: TCalendarDayOfWeek): Date[][] {
  const firstDay = startOfMonth(month)
  const gridStart = addDays(firstDay, -getWeekOffset(firstDay, weekStartsOn))
  const days = Array.from({ length: weeksPerMonth * daysPerWeek }, (_, index) =>
    addDays(gridStart, index),
  )

  return Array.from({ length: weeksPerMonth }, (_, week) =>
    days.slice(week * daysPerWeek, (week + 1) * daysPerWeek),
  )
}

export function getWeekdays(
  weekStartsOn: TCalendarDayOfWeek,
  locale: string | undefined,
): TCalendarWeekday[] {
  const shortFormat = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const longFormat = new Intl.DateTimeFormat(locale, { weekday: 'long' })

  return Array.from({ length: daysPerWeek }, (_, index) => {
    const day = addDays(referenceSunday, (weekStartsOn + index) % daysPerWeek)

    return {
      key: day.getDay() as TCalendarDayOfWeek,
      short: shortFormat.format(day),
      long: longFormat.format(day),
    }
  })
}

export function getFocusDate({
  focusedDate,
  selected,
  today,
  visibleMonth,
  minDate,
  maxDate,
}: {
  focusedDate: Date | null
  selected: Date | null
  today: Date
  visibleMonth: Date
  minDate?: Date | undefined
  maxDate?: Date | undefined
}): Date {
  if (focusedDate && isSameMonth(focusedDate, visibleMonth)) {
    return focusedDate
  }

  if (selected && isSameMonth(selected, visibleMonth)) {
    return selected
  }

  if (isSameMonth(today, visibleMonth)) {
    return today
  }

  return clampDate(startOfMonth(visibleMonth), minDate, maxDate)
}
