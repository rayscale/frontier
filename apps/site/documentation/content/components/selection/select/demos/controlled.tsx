import { Select } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<string | null>('banana')

  return (
    <>
      <Select.Root value={value} onValueChange={setValue}>
        <Select.Label>Fruit</Select.Label>
        <Select.Trigger>
          <Select.Value placeholder="Pick a fruit" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
            <Select.Item value="cherry">Cherry</Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>
      <p>Selected: {value ?? 'none'}</p>
    </>
  )
}
