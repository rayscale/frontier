import { CheckboxGroup } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<string[]>(['email'])

  return (
    <>
      <CheckboxGroup label="Notifications" value={value} onValueChange={setValue}>
        <CheckboxGroup.Item value="email" label="Email" />
        <CheckboxGroup.Item value="push" label="Push" />
        <CheckboxGroup.Item value="sms" label="Text message" />
      </CheckboxGroup>
      <p>Selected: {value.length > 0 ? value.join(', ') : 'none'}</p>
    </>
  )
}
