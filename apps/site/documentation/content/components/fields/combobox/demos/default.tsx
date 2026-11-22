import { Combobox } from '@rayscale/frontier'

const fruit = [
  { value: 'apple', label: 'Apple' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'lemon', label: 'Lemon' },
]

export default function Default() {
  return (
    <Combobox items={fruit}>
      <Combobox.Input label="Fruit" placeholder="Search fruit" />
      <Combobox.Content>
        <Combobox.List />
        <Combobox.Empty>No fruit found.</Combobox.Empty>
      </Combobox.Content>
    </Combobox>
  )
}
