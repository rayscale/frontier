import type { ReactElement } from 'react'

import { AnimatedHighlight } from '../../../internal/primitives/animated-highlight/animated-highlight.js'
import { Popover } from '../../popover/popover.js'
import { firstEnabledHour, hours12, hours24, pad, periodHours, to12 } from '../helpers/time.js'
import type { TTimePickerState } from '../hooks/use-time-picker.js'

import { TimeColumn, TimeOption } from './columns.js'

interface TTimePickerPopupProps {
  picker: TTimePickerState
}

export function TimePickerPopup({ picker }: TTimePickerPopupProps): ReactElement {
  const {
    format,
    constraints,
    dayPeriods,
    selectedHour,
    selectedMinute,
    selectedPeriod,
    minuteChoices,
    hovered,
    setHovered,
    selectHour,
    selectHour12,
    selectMinute,
    selectPeriod,
    isHourEnabled,
    isHour12Enabled,
    isMinuteEnabled,
    hourName,
    minuteName,
    periodName,
  } = picker
  const hoverProps = (key: string) => ({
    highlighted: hovered === key,
    onHover: (hovering: boolean) => {
      setHovered(hovering ? key : null)
    },
  })

  return (
    <Popover.Content aria-label="Choose time" align="start" className="frontier-time-picker__popup">
      <div className="frontier-time-picker__panel">
        <AnimatedHighlight followTargetShape />
        <TimeColumn legend="Hour">
          {format === '24h'
            ? hours24.map((hour) => (
                <TimeOption
                  key={hour}
                  name={hourName}
                  value={String(hour)}
                  label={pad(hour)}
                  checked={selectedHour === hour}
                  disabled={!isHourEnabled(hour)}
                  {...hoverProps(`hour-${String(hour)}`)}
                  onSelect={() => {
                    selectHour(hour)
                  }}
                />
              ))
            : hours12.map((hour12) => (
                <TimeOption
                  key={hour12}
                  name={hourName}
                  value={String(hour12)}
                  label={pad(hour12)}
                  checked={selectedHour !== undefined && to12(selectedHour) === hour12}
                  disabled={!isHour12Enabled(hour12)}
                  {...hoverProps(`hour-${String(hour12)}`)}
                  onSelect={() => {
                    selectHour12(hour12)
                  }}
                />
              ))}
        </TimeColumn>
        <TimeColumn legend="Minute">
          {minuteChoices.map((minute) => (
            <TimeOption
              key={minute}
              name={minuteName}
              value={String(minute)}
              label={pad(minute)}
              checked={selectedMinute === minute}
              disabled={!isMinuteEnabled(minute)}
              {...hoverProps(`minute-${String(minute)}`)}
              onSelect={() => {
                selectMinute(minute)
              }}
            />
          ))}
        </TimeColumn>
        {format === '12h' && (
          <TimeColumn legend="AM/PM">
            {(['am', 'pm'] as const).map((period) => (
              <TimeOption
                key={period}
                name={periodName}
                value={period}
                label={dayPeriods[period]}
                checked={selectedPeriod === period}
                disabled={firstEnabledHour(constraints, periodHours(period)) === undefined}
                {...hoverProps(`period-${period}`)}
                onSelect={() => {
                  selectPeriod(period)
                }}
              />
            ))}
          </TimeColumn>
        )}
      </div>
    </Popover.Content>
  )
}
