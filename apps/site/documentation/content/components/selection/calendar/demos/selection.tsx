import { Calendar } from '@rayscale/frontier'

export default function Selection() {
  return (
    <Calendar
      defaultMonth={new Date(2025, 2, 1)}
      defaultValue={new Date(2025, 2, 14)}
      locale="en-US"
    />
  )
}
