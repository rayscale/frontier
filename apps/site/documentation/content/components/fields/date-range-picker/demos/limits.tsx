import { DateRangePicker } from '@rayscale/frontier'

export default function Limits() {
  return (
    <DateRangePicker
      aria-label="Booking"
      minDate={new Date(2025, 2, 5)}
      maxDate={new Date(2025, 2, 25)}
      weekStartsOn={1}
    />
  )
}
