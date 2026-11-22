import { DatePicker } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [date, setDate] = useState<Date | null>(new Date(2025, 2, 14))

  return (
    <>
      <DatePicker aria-label="Due date" value={date} onValueChange={setDate} />
      <p>{date ? date.toDateString() : 'No date selected.'}</p>
    </>
  )
}
