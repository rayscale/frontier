import { CheckboxGroup, Fieldset } from '@rayscale/frontier'

export default function WithChoices() {
  return (
    <Fieldset.Root>
      <Fieldset.Legend>Preferences</Fieldset.Legend>
      <CheckboxGroup label="Notifications" defaultValue={['email']}>
        <CheckboxGroup.Item value="email" label="Email" />
        <CheckboxGroup.Item value="push" label="Push" />
      </CheckboxGroup>
    </Fieldset.Root>
  )
}
