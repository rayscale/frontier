import { RadioGroup } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <>
      <RadioGroup label="Whole group" disabled defaultValue="a">
        <RadioGroup.Item value="a" label="Option A" />
        <RadioGroup.Item value="b" label="Option B" />
      </RadioGroup>
      <RadioGroup label="One option" defaultValue="a">
        <RadioGroup.Item value="a" label="Option A" />
        <RadioGroup.Item value="b" label="Option B" disabled />
      </RadioGroup>
    </>
  )
}
