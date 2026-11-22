import { TimePicker } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [time, setTime] = useState<string | null>('08:45')

  return (
    <>
      <TimePicker aria-label="Alarm" value={time} onValueChange={setTime} />
      <p>Selected: {time ?? 'none'}</p>
    </>
  )
}
