import { DateRangePicker } from '@rayscale/frontier'

export default function Clearable() {
  return (
    <DateRangePicker
      aria-label="Report period"
      clearable
      defaultValue={{ start: new Date(2025, 2, 3), end: new Date(2025, 2, 9) }}
    />
  )
}
