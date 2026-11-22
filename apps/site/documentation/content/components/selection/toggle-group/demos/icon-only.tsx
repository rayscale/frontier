import { Bold, Italic, ToggleGroup, Underline } from '@rayscale/frontier'

export default function IconOnly() {
  return (
    <ToggleGroup type="multiple" aria-label="Text formatting">
      <ToggleGroup.Item value="bold" aria-label="Bold">
        <Bold aria-hidden="true" />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Italic">
        <Italic aria-hidden="true" />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Underline">
        <Underline aria-hidden="true" />
      </ToggleGroup.Item>
    </ToggleGroup>
  )
}
