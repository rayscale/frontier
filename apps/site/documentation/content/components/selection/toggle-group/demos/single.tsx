import { ToggleGroup } from '@rayscale/frontier'

export default function Single() {
  return (
    <ToggleGroup type="single" aria-label="Alignment" defaultValue="left">
      <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
      <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
      <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
    </ToggleGroup>
  )
}
