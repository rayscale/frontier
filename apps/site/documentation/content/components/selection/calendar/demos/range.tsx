import { Calendar } from '@rayscale/frontier'

export default function Range() {
  return (
    <Calendar
      defaultMonth={new Date(2025, 2, 1)}
      value={null}
      rangeStart={new Date(2025, 2, 10)}
      rangeEnd={new Date(2025, 2, 16)}
      locale="en-US"
    />
  )
}
