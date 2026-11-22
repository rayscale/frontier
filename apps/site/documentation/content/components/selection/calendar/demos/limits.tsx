import { Calendar } from '@rayscale/frontier'

export default function Limits() {
  return (
    <Calendar
      defaultMonth={new Date(2025, 2, 1)}
      minDate={new Date(2025, 2, 5)}
      maxDate={new Date(2025, 2, 25)}
      locale="en-US"
    />
  )
}
