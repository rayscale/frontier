import { RadioGroup } from '@rayscale/frontier'

export default function Horizontal() {
  return (
    <RadioGroup label="Density" orientation="horizontal" defaultValue="comfortable">
      <RadioGroup.Item value="compact" label="Compact" />
      <RadioGroup.Item value="comfortable" label="Comfortable" />
      <RadioGroup.Item value="spacious" label="Spacious" />
    </RadioGroup>
  )
}
