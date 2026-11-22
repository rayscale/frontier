import { ToggleGroup } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<string[]>(['bold'])

  return (
    <>
      <ToggleGroup
        type="multiple"
        aria-label="Text formatting"
        value={value}
        onValueChange={setValue}
      >
        <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
        <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
      </ToggleGroup>
      <p>Pressed: {value.length > 0 ? value.join(', ') : 'none'}</p>
    </>
  )
}
