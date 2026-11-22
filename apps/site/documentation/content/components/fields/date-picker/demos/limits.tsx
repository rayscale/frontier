import { DatePicker } from '@rayscale/frontier'

export default function Limits() {
  return (
    <DatePicker
      aria-label="Appointment"
      minDate={new Date(2025, 2, 5)}
      maxDate={new Date(2025, 2, 25)}
      defaultValue={new Date(2025, 2, 10)}
    />
  )
}
