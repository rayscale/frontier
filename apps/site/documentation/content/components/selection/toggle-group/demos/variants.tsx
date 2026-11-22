import { ToggleGroup } from '@rayscale/frontier'

export default function Variants() {
  return (
    <ToggleGroup type="single" aria-label="Density" variant="outline" size="small" defaultValue="a">
      <ToggleGroup.Item value="a">Compact</ToggleGroup.Item>
      <ToggleGroup.Item value="b">Comfortable</ToggleGroup.Item>
      <ToggleGroup.Item value="c">Spacious</ToggleGroup.Item>
    </ToggleGroup>
  )
}
