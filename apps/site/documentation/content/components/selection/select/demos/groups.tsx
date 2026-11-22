import { Select } from '@rayscale/frontier'

export default function Groups() {
  return (
    <Select.Root>
      <Select.Label>Food</Select.Label>
      <Select.Trigger>
        <Select.Value placeholder="Pick a food" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.List>
          <Select.Group>
            <Select.GroupLabel>Fruit</Select.GroupLabel>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.GroupLabel>Vegetables</Select.GroupLabel>
            <Select.Item value="carrot">Carrot</Select.Item>
            <Select.Item value="leek">Leek</Select.Item>
          </Select.Group>
        </Select.List>
      </Select.Content>
    </Select.Root>
  )
}
