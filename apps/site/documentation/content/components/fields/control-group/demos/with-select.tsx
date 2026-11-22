import { Button, ControlGroup, Select } from '@rayscale/frontier'

export default function WithSelect() {
  return (
    <ControlGroup aria-label="Filter">
      <Select.Root defaultValue="all">
        <Select.Trigger aria-label="Category">
          <Select.Value placeholder="Category" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="all">All notes</Select.Item>
            <Select.Item value="shared">Shared</Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>
      <Button variant="outline">Apply</Button>
    </ControlGroup>
  )
}
