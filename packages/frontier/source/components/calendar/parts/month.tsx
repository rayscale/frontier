import { motion, useIsPresent } from 'motion/react'
import type { KeyboardEvent, ReactElement } from 'react'

import { durationBase, easingStandard } from '../../../styles/motion.js'
import { getDateKey, isSameDay, isSameMonth } from '../helpers/date.js'
import { getWeeks, type TCalendarWeekday } from '../helpers/grid.js'
import { getDayRangeState, type TCalendarRange } from '../helpers/range.js'
import type { TCalendarDayOfWeek } from '../types.js'

const monthSlideOffset = 24

interface TCalendarMonthProps {
  month: Date
  weekStartsOn: TCalendarDayOfWeek
  weekdays: TCalendarWeekday[]
  dayFormatter: Intl.DateTimeFormat
  titleId: string
  /** Day that receives the tab stop. `null` removes every tab stop. */
  focusDate: Date | null
  selected: Date | null
  today: Date
  direction: number
  reduceMotion: boolean
  isDayDisabled: (date: Date) => boolean
  onSelectDay: (date: Date) => void
  onFocusDay: (date: Date) => void
  onDayKeyDown: (event: KeyboardEvent<HTMLButtonElement>, date: Date) => void
  hoveredDay: Date | null
  onHoverDay: (day: Date) => void
  range: TCalendarRange | null
}

/**
 * One month grid. While it is leaving during a month transition, it is hidden
 * from assistive technology and removed from the tab order so only the
 * entering month is interactive.
 */
export function CalendarMonth({
  month,
  weekStartsOn,
  weekdays,
  dayFormatter,
  titleId,
  focusDate,
  selected,
  today,
  direction,
  reduceMotion,
  isDayDisabled,
  onSelectDay,
  onFocusDay,
  onDayKeyDown,
  hoveredDay,
  onHoverDay,
  range,
}: TCalendarMonthProps): ReactElement {
  const present = useIsPresent()
  const weeks = getWeeks(month, weekStartsOn)
  const slideOffset = reduceMotion ? 0 : monthSlideOffset

  return (
    <motion.div
      className="frontier-calendar__month"
      data-active={present ? '' : undefined}
      aria-hidden={present ? undefined : true}
      custom={direction}
      variants={{
        enter: (step: number) => ({ x: step * slideOffset, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (step: number) => ({ x: step * -slideOffset, opacity: 0 }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: reduceMotion ? 0 : durationBase,
        ease: easingStandard,
      }}
    >
      <table className="frontier-calendar__grid" role="grid" aria-labelledby={titleId}>
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th key={weekday.key} scope="col" className="frontier-calendar__weekday">
                <abbr title={weekday.long}>{weekday.short}</abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={week[0] ? getDateKey(week[0]) : weekIndex}>
              {week.map((day) => {
                const dayKey = getDateKey(day)
                const outsideState = !isSameMonth(day, month)
                const selectedState = isSameDay(selected, day)
                const todayState = isSameDay(today, day)
                const disabledState = isDayDisabled(day)
                const tabStop = present && focusDate !== null && isSameDay(focusDate, day)
                const dayRange = getDayRangeState(day, range)
                const endpoint = dayRange.start || dayRange.end
                const rangeMember = dayRange.inRange && !dayRange.preview

                return (
                  <td
                    key={dayKey}
                    role="gridcell"
                    aria-selected={selectedState || dayRange.start || rangeMember}
                    className="frontier-calendar__cell"
                    data-in-range={dayRange.inRange ? '' : undefined}
                    data-range-start={dayRange.start ? '' : undefined}
                    data-range-end={dayRange.end ? '' : undefined}
                    data-preview={dayRange.inRange && dayRange.preview ? '' : undefined}
                  >
                    <button
                      type="button"
                      className="frontier-calendar__day"
                      data-date={dayKey}
                      aria-label={dayFormatter.format(day)}
                      aria-current={todayState ? 'date' : undefined}
                      aria-disabled={disabledState || undefined}
                      tabIndex={tabStop ? 0 : -1}
                      data-selected={selectedState || endpoint ? '' : undefined}
                      data-today={todayState ? '' : undefined}
                      data-outside={outsideState ? '' : undefined}
                      data-disabled={disabledState ? '' : undefined}
                      data-preview={dayRange.preview && endpoint ? '' : undefined}
                      data-highlighted={
                        isSameDay(hoveredDay, day) && !disabledState ? '' : undefined
                      }
                      onPointerEnter={() => {
                        onHoverDay(day)
                      }}
                      onClick={() => {
                        onSelectDay(day)
                      }}
                      onFocus={() => {
                        onFocusDay(day)
                      }}
                      onKeyDown={(event) => {
                        onDayKeyDown(event, day)
                      }}
                    >
                      {day.getDate()}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}
