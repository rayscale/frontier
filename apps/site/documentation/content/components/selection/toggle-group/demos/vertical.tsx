import { ToggleGroup } from '@rayscale/frontier'

export default function Vertical() {
  return (
    <ToggleGroup type="single" aria-label="Alignment" orientation="vertical" defaultValue="top">
      <ToggleGroup.Item value="top">Top</ToggleGroup.Item>
      <ToggleGroup.Item value="middle">Middle</ToggleGroup.Item>
      <ToggleGroup.Item value="bottom">Bottom</ToggleGroup.Item>
    </ToggleGroup>
  )
}
