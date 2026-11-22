import { RadioGroup } from '@rayscale/frontier'

export default function Default() {
  return (
    <RadioGroup label="Frequency" defaultValue="weekly">
      <RadioGroup.Item value="daily" label="Daily" />
      <RadioGroup.Item value="weekly" label="Weekly" />
      <RadioGroup.Item value="monthly" label="Monthly" />
    </RadioGroup>
  )
}
