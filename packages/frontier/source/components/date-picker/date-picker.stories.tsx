import type { Meta, StoryObj } from '@storybook/react-vite'
import { type ReactElement, type ReactNode, useState } from 'react'

import { DatePicker } from './date-picker.js'

const meta = {
  parameters: {
    layout: 'centered',
  },
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Start date',
    locale: 'en-US',
  },
} satisfies Meta<typeof DatePicker>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The default date picker input and popup calendar.',
      },
    },
  },
}

export const Selection: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Date pickers support initialized selected values.',
      },
    },
  },
  args: {
    defaultValue: new Date(2025, 2, 14),
  },
}

export const Placeholder: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Date pickers support custom placeholder text.',
      },
    },
  },
  args: {
    placeholder: 'Choose a delivery date',
    'aria-label': 'Delivery date',
  },
}

export const Disabled: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Date pickers can be disabled to prevent interaction.',
      },
    },
  },
  args: {
    defaultValue: new Date(2025, 2, 14),
    disabled: true,
  },
}

export const ReadOnly: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Date pickers support read-only mode.',
      },
    },
  },
  args: {
    defaultValue: new Date(2025, 2, 14),
    readOnly: true,
  },
}

export const Constraints: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Date pickers support minimum and maximum date constraints.',
      },
    },
  },
  args: {
    defaultValue: new Date(2025, 2, 14),
    minDate: new Date(2025, 2, 10),
    maxDate: new Date(2025, 2, 25),
    'aria-label': 'Check-in date',
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
    'aria-label': 'Appointment date',
  },
}

export const Spanish: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Date pickers support localized date formatting and day names.',
      },
    },
  },
  args: {
    locale: 'es-ES',
    defaultValue: new Date(2025, 2, 14),
    placeholder: 'Selecciona una fecha',
    'aria-label': 'Fecha',
  },
}

export const Formatting: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Date pickers support custom date formatting functions.',
      },
    },
  },
  args: {
    defaultValue: new Date(2025, 2, 14),
    formatDate: (date) =>
      date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
  },
}

export const Controlled: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Date pickers support controlled value state management.',
      },
    },
  },
  render: function ControlledDatePicker() {
    const [value, setValue] = useState<Date | null>(new Date(2025, 2, 14))

    return (
      <div style={{ display: 'grid', gap: '1rem', justifyItems: 'start' }}>
        <DatePicker aria-label="Event date" locale="en-US" value={value} onValueChange={setValue} />
        <p>Selected: {value ? value.toDateString() : 'none'}</p>
        <button
          type="button"
          onClick={() => {
            setValue(null)
          }}
        >
          Clear
        </button>
      </div>
    )
  },
}

export const Booking: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Check-in and check-out booking form pattern with dependent date constraints.',
      },
    },
  },
  render: function BookingFormStory() {
    const [checkIn, setCheckIn] = useState<Date | null>(null)
    const [checkOut, setCheckOut] = useState<Date | null>(null)

    return (
      <div style={{ display: 'grid', gap: '1rem', width: '18rem' }}>
        <DatePicker
          aria-label="Check-in"
          locale="en-US"
          value={checkIn}
          onValueChange={(date) => {
            setCheckIn(date)
            if (checkOut && checkOut < date) {
              setCheckOut(null)
            }
          }}
          minDate={new Date(2025, 2, 1)}
        />
        <DatePicker
          aria-label="Check-out"
          locale="en-US"
          value={checkOut}
          onValueChange={setCheckOut}
          minDate={checkIn ?? new Date(2025, 2, 1)}
        />
      </div>
    )
  },
}

export const Narrow: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Date pickers inside narrow container widths.',
      },
    },
  },
  args: {
    defaultValue: new Date(2025, 2, 14),
  },
  decorators: [
    (story: () => ReactNode): ReactElement => <div style={{ width: '12rem' }}>{story()}</div>,
  ],
}
