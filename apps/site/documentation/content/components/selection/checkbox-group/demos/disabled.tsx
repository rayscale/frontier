import { CheckboxGroup } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <>
      <CheckboxGroup label="Whole group" disabled defaultValue={['email']}>
        <CheckboxGroup.Item value="email" label="Email" />
        <CheckboxGroup.Item value="push" label="Push" />
      </CheckboxGroup>
      <CheckboxGroup label="One option">
        <CheckboxGroup.Item value="email" label="Email" />
        <CheckboxGroup.Item value="push" label="Push" disabled />
      </CheckboxGroup>
    </>
  )
}
