import { addDays, getDayIndex, startOfDay } from './date.js'

export interface TCalendarRange {
  start: Date
  /** `null` while only the start is chosen. */
  end: Date | null
  preview: boolean
}

export interface TDayRangeState {
  start: boolean
  end: boolean
  inRange: boolean
  preview: boolean
}

const noDayRangeState: TDayRangeState = {
  start: false,
  end: false,
  inRange: false,
  preview: false,
}

export function getDayRangeState(day: Date, range: TCalendarRange | null): TDayRangeState {
  if (!range) {
    return noDayRangeState
  }

  const index = getDayIndex(day)
  const startIndex = getDayIndex(range.start)
  const endIndex = range.end === null ? null : getDayIndex(range.end)

  return {
    start: index === startIndex,
    end: index === endIndex,
    inRange: endIndex !== null && index >= startIndex && index <= endIndex,
    preview: range.preview,
  }
}

function isEnabledSpan(start: Date, end: Date, isDayDisabled: (date: Date) => boolean) {
  for (let day = start; getDayIndex(day) <= getDayIndex(end); day = addDays(day, 1)) {
    if (isDayDisabled(day)) {
      return false
    }
  }

  return true
}

export function getCalendarRange({
  rangeStart,
  rangeEnd,
  hoveredDay,
  isDayDisabled,
}: {
  rangeStart: Date | null
  rangeEnd: Date | null
  hoveredDay: Date | null
  isDayDisabled: (date: Date) => boolean
}): TCalendarRange | null {
  if (!rangeStart) {
    return null
  }

  const start = startOfDay(rangeStart)
  if (rangeEnd) {
    return { start, end: startOfDay(rangeEnd), preview: false }
  }

  if (
    hoveredDay &&
    getDayIndex(hoveredDay) >= getDayIndex(start) &&
    isEnabledSpan(start, startOfDay(hoveredDay), isDayDisabled)
  ) {
    return { start, end: startOfDay(hoveredDay), preview: true }
  }

  return { start, end: null, preview: false }
}
