import { DateRangePicker } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: new Date(2025, 2, 10),
    end: new Date(2025, 2, 16),
  })

  return (
    <>
      <DateRangePicker aria-label="Trip dates" value={range} onValueChange={setRange} />
      <p>
        {range.start && range.end
          ? `${range.start.toDateString()} to ${range.end.toDateString()}`
          : 'No range selected.'}
      </p>
    </>
  )
}
