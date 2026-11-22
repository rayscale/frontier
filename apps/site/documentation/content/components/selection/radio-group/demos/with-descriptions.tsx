import { RadioGroup } from '@rayscale/frontier'

export default function WithDescriptions() {
  return (
    <RadioGroup label="Plan" description="You can change it at any time." defaultValue="team">
      <RadioGroup.Item value="solo" label="Solo" description="For one person." />
      <RadioGroup.Item value="team" label="Team" description="For a group that works together." />
    </RadioGroup>
  )
}
