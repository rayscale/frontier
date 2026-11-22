import { DatePicker } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <>
      <DatePicker aria-label="Disabled" disabled />
      <DatePicker aria-label="Read only" readOnly defaultValue={new Date(2025, 2, 14)} />
    </>
  )
}
