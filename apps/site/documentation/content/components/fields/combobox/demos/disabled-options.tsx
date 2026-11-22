import { Combobox } from '@rayscale/frontier'

const fruit = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana', disabled: true },
  { value: 'cherry', label: 'Cherry' },
]

export default function DisabledOptions() {
  return (
    <Combobox items={fruit}>
      <Combobox.Input label="Fruit" placeholder="Search fruit" />
      <Combobox.Content>
        <Combobox.List />
      </Combobox.Content>
    </Combobox>
  )
}
