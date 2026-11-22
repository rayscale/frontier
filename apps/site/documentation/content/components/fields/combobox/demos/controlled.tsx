import { Combobox } from '@rayscale/frontier'
import { useState } from 'react'

const fruit = [
  { value: 'apple', label: 'Apple' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'lemon', label: 'Lemon' },
]

export default function Controlled() {
  const [value, setValue] = useState<string | null>('banana')

  return (
    <>
      <Combobox items={fruit} value={value} onValueChange={setValue}>
        <Combobox.Input label="Fruit" placeholder="Search fruit" />
        <Combobox.Content>
          <Combobox.List />
        </Combobox.Content>
      </Combobox>
      <p>Selected: {value ?? 'none'}</p>
    </>
  )
}
