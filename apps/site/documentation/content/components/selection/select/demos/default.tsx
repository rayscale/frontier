import { Select } from '@rayscale/frontier'

export default function Default() {
  return (
    <Select.Root>
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
  )
}
