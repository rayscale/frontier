import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Calendar, type TCalendarProps } from './calendar.js'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    defaultMonth: new Date(2025, 2, 1),
    locale: 'en-US',
  },
} satisfies Meta<typeof Calendar>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The default calendar view.',
      },
    },
  },
}

export const Selection: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Calendars support selecting a specific date.',
      },
    },
  },
  args: {
    defaultValue: new Date(2025, 2, 14),
  },
}

export const MondayStart: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The week can be configured to start on Monday.',
      },
    },
  },
  args: {
    defaultValue: new Date(2025, 2, 14),
    weekStartsOn: 1,
  },
}

export const Spanish: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Calendars support localized date formatting and day names.',
      },
    },
  },
  args: {
    locale: 'es-ES',
    defaultValue: new Date(2025, 2, 14),
    weekStartsOn: 1,
  },
}

export const Limits: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Selectable date ranges can be restricted using minimum and maximum dates.',
      },
    },
  },
  args: {
    defaultValue: new Date(2025, 2, 14),
    minDate: new Date(2025, 2, 10),
    maxDate: new Date(2025, 4, 20),
  },
}

export const DisabledDates: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Specific dates can be disabled via a custom predicate function.',
      },
    },
  },
  args: {
    defaultValue: new Date(2025, 2, 14),
    isDateDisabled: (date) => date.getDay() === 0 || date.getDay() === 6,
  },
}

export const Disabled: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Calendars can be disabled entirely.',
      },
    },
  },
  args: {
    defaultValue: new Date(2025, 2, 14),
    disabled: true,
  },
}

export const Controlled: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Calendars support fully controlled state for value and month navigation.',
      },
    },
  },
  render: (args) => <ControlledCalendar {...args} />,
}

export const Booking: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'A booking picker configuration with disabled weekdays and minimum dates.',
      },
    },
  },
  render: (args) => {
    const today = new Date()
    const firstAvailable = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    return (
      <Calendar
        {...args}
        defaultValue={null}
        minDate={firstAvailable}
        isDateDisabled={(date) => date.getDay() === 1}
      />
    )
  },
}

export const Multiple: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple calendar instances rendered side by side.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <Calendar {...args} defaultValue={new Date(2025, 2, 14)} />
      <Calendar
        {...args}
        defaultMonth={new Date(2025, 3, 1)}
        defaultValue={new Date(2025, 3, 22)}
      />
    </div>
  ),
}

function ControlledCalendar(props: TCalendarProps) {
  const [value, setValue] = useState<Date | null>(new Date(2025, 2, 14))
  const [month, setMonth] = useState(new Date(2025, 2, 1))

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Calendar
        {...props}
        value={value}
        onValueChange={setValue}
        month={month}
        onMonthChange={setMonth}
      />
      <p style={{ margin: 0 }}>Selected: {value ? value.toDateString() : 'none'}</p>
    </div>
  )
}
