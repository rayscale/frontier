import { Combobox } from '@rayscale/frontier'

const fruit = [
  { value: 'apple', label: 'Apple' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'lemon', label: 'Lemon' },
]

export default function ClearAndTrigger() {
  return (
    <Combobox items={fruit} defaultValue="grape">
      <Combobox.Input label="Fruit">
        <Combobox.Clear />
        <Combobox.Trigger />
      </Combobox.Input>
      <Combobox.Content>
        <Combobox.List />
        <Combobox.Empty>No fruit found.</Combobox.Empty>
      </Combobox.Content>
    </Combobox>
  )
}
