import { Calendar } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [date, setDate] = useState<Date | null>(new Date(2025, 2, 14))

  return (
    <>
      <Calendar
        value={date}
        onValueChange={setDate}
        defaultMonth={new Date(2025, 2, 1)}
        locale="en-US"
      />
      <p>{date ? date.toDateString() : 'No date selected.'}</p>
    </>
  )
}
