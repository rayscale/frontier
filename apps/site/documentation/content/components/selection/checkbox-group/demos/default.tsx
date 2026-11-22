import { CheckboxGroup } from '@rayscale/frontier'

export default function Default() {
  return (
    <CheckboxGroup label="Notifications" defaultValue={['email']}>
      <CheckboxGroup.Item value="email" label="Email" />
      <CheckboxGroup.Item value="push" label="Push" />
      <CheckboxGroup.Item value="sms" label="Text message" />
    </CheckboxGroup>
  )
}
