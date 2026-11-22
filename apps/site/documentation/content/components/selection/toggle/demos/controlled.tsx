import { Toggle } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [pressed, setPressed] = useState(false)

  return (
    <>
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        Notifications
      </Toggle>
      <p>{pressed ? 'On' : 'Off'}</p>
    </>
  )
}
