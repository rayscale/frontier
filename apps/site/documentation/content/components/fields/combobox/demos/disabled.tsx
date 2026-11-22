import { Combobox } from '@rayscale/frontier'

const fruit = [
  { value: 'apple', label: 'Apple' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'lemon', label: 'Lemon' },
]

export default function Disabled() {
  return (
    <Combobox items={fruit} disabled defaultValue="lemon">
      <Combobox.Input label="Fruit" />
      <Combobox.Trigger />
      <Combobox.Content>
        <Combobox.List />
      </Combobox.Content>
    </Combobox>
  )
}
