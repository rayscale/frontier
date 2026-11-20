import { useId, useMemo, useState } from 'react'

import { formatDisplay, getDayPeriodLabels } from '../helpers/format.js'
import {
  firstEnabledHour,
  hours24,
  inRange,
  isHourEnabled,
  isMinuteEnabled,
  minuteGrid,
  parseTime,
  periodHours,
  periodOf,
  pickDayMinutes,
  resolveConstraints,
  to24,
  toValue,
} from '../helpers/time.js'
import type { TDayPeriodLabels, TPeriod, TTimeConstraints, TTimePickerFormat } from '../types.js'

interface TUseTimePickerOptions {
  value: string | null | undefined
  defaultValue: string | null
  onValueChange: ((time: string) => void) | undefined
  open: boolean | undefined
  defaultOpen: boolean
  onOpenChange: ((open: boolean) => void) | undefined
  disabled: boolean
  readOnly: boolean
  placeholder: string
  format: TTimePickerFormat
  minuteStep: number
  minTime: string | undefined
  maxTime: string | undefined
  locale: string | undefined
}

export function useTimePicker({
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen,
  onOpenChange,
  disabled,
  readOnly,
  placeholder,
  format,
  minuteStep,
  minTime,
  maxTime,
  locale,
}: TUseTimePickerOptions): {
  valueId: string
  groupId: string
  openState: boolean
  setOpen: (nextOpen: boolean) => void
  format: TTimePickerFormat
  constraints: TTimeConstraints
  dayPeriods: TDayPeriodLabels
  selected: number | undefined
  selectedHour: number | undefined
  selectedMinute: number | undefined
  selectedPeriod: TPeriod | undefined
  displayText: string
  minuteChoices: number[]
  hovered: string | null
  setHovered: React.Dispatch<React.SetStateAction<string | null>>
  selectHour: (hour: number) => void
  selectHour12: (hour12: number) => void
  selectMinute: (minute: number) => void
  selectPeriod: (period: TPeriod) => void
  isHourEnabled: (hour: number) => boolean
  isHour12Enabled: (hour12: number) => boolean
  isMinuteEnabled: (minute: number) => boolean
  hourName: string
  minuteName: string
  periodName: string
} {
  const valueId = useId()
  const groupId = useId()
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [hovered, setHovered] = useState<string | null>(null)

  const valueControlled = valueProp !== undefined
  const value = valueControlled ? valueProp : internalValue
  const interactive = !disabled && !readOnly
  const openState = interactive && (openProp ?? internalOpen)

  const constraints = useMemo(
    () => resolveConstraints(minuteStep, minTime, maxTime),
    [minuteStep, minTime, maxTime],
  )
  const dayPeriods = useMemo(() => getDayPeriodLabels(locale), [locale])

  const selected = value ? parseTime(value) : undefined
  const selectedHour = selected === undefined ? undefined : Math.floor(selected / 60)
  const selectedMinute = selected === undefined ? undefined : selected % 60
  const selectedPeriod = selectedHour === undefined ? undefined : periodOf(selectedHour)

  const displayText =
    selected === undefined ? placeholder : formatDisplay(selected, format, dayPeriods)
  const minuteChoices = minuteGrid(constraints.step)
  if (selectedMinute !== undefined && !minuteChoices.includes(selectedMinute)) {
    minuteChoices.push(selectedMinute)
    minuteChoices.sort((a, b) => a - b)
  }

  const setOpen = (nextOpen: boolean) => {
    if (!interactive) {
      return
    }

    if (openProp === undefined) {
      setInternalOpen(nextOpen)
    }

    onOpenChange?.(nextOpen)
  }

  const commit = (dayMinutes: number | undefined) => {
    if (dayMinutes === undefined || dayMinutes === selected) {
      return
    }

    const next = toValue(dayMinutes)
    if (!valueControlled) {
      setInternalValue(next)
    }

    onValueChange?.(next)
  }

  const selectHour = (hour: number) => {
    commit(pickDayMinutes(constraints, hour, selectedMinute))
  }

  const selectHour12 = (hour12: number) => {
    const period = selectedPeriod ?? (isHourEnabled(constraints, to24(hour12, 'am')) ? 'am' : 'pm')

    selectHour(to24(hour12, period))
  }

  const selectMinute = (minute: number) => {
    const hour =
      selectedHour ?? hours24.find((candidate) => inRange(constraints, candidate * 60 + minute))

    if (hour !== undefined) {
      commit(hour * 60 + minute)
    }
  }

  const selectPeriod = (period: TPeriod) => {
    const preferred =
      selectedHour === undefined ? undefined : (selectedHour % 12) + (period === 'pm' ? 12 : 0)
    const hour =
      preferred !== undefined && isHourEnabled(constraints, preferred)
        ? preferred
        : firstEnabledHour(constraints, periodHours(period))

    if (hour !== undefined) {
      commit(pickDayMinutes(constraints, hour, selectedMinute))
    }
  }

  const isHour12Enabled = (hour12: number) =>
    selectedPeriod === undefined
      ? isHourEnabled(constraints, to24(hour12, 'am')) ||
        isHourEnabled(constraints, to24(hour12, 'pm'))
      : isHourEnabled(constraints, to24(hour12, selectedPeriod))

  const hourName = `${groupId}-hour`
  const minuteName = `${groupId}-minute`
  const periodName = `${groupId}-period`

  return {
    valueId,
    groupId,
    openState,
    setOpen,
    format,
    constraints,
    dayPeriods,
    selected,
    selectedHour,
    selectedMinute,
    selectedPeriod,
    displayText,
    minuteChoices,
    hovered,
    setHovered,
    selectHour,
    selectHour12,
    selectMinute,
    selectPeriod,
    isHourEnabled: (hour: number) => isHourEnabled(constraints, hour),
    isHour12Enabled,
    isMinuteEnabled: (minute: number) => isMinuteEnabled(constraints, selectedHour, minute),
    hourName,
    minuteName,
    periodName,
  }
}

export type TTimePickerState = ReturnType<typeof useTimePicker>
