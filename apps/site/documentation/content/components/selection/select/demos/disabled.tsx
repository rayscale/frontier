import { Select } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <>
      <Select.Root disabled defaultValue="apple">
        <Select.Label>Whole select</Select.Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="apple">Apple</Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>
      <Select.Root>
        <Select.Label>One option</Select.Label>
        <Select.Trigger>
          <Select.Value placeholder="Pick a fruit" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="banana" disabled>
              Banana
            </Select.Item>
            <Select.Item value="cherry">Cherry</Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>
    </>
  )
}
