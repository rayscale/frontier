import { RadioGroup } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState('light')

  return (
    <>
      <RadioGroup label="Appearance" value={value} onValueChange={setValue}>
        <RadioGroup.Item value="light" label="Light" />
        <RadioGroup.Item value="dark" label="Dark" />
        <RadioGroup.Item value="system" label="System" />
      </RadioGroup>
      <p>Selected: {value}</p>
    </>
  )
}
