import { Calendar } from '@rayscale/frontier'

export default function DisabledDates() {
  return (
    <Calendar
      defaultMonth={new Date(2025, 2, 1)}
      isDateDisabled={(date) => date.getDay() === 0 || date.getDay() === 6}
      locale="en-US"
    />
  )
}
