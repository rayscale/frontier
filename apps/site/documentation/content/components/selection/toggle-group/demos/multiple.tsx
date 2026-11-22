import { ToggleGroup } from '@rayscale/frontier'

export default function Multiple() {
  return (
    <ToggleGroup type="multiple" aria-label="Text formatting" defaultValue={['bold']}>
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
      <ToggleGroup.Item value="underline">Underline</ToggleGroup.Item>
    </ToggleGroup>
  )
}
