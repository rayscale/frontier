import { CheckboxGroup } from '@rayscale/frontier'

export default function WithDescription() {
  return (
    <CheckboxGroup label="Notifications" description="Choose how you want to hear from us.">
      <CheckboxGroup.Item
        value="email"
        label="Email"
        description="A summary at the end of each day."
      />
      <CheckboxGroup.Item value="push" label="Push" description="Instant alerts on your phone." />
    </CheckboxGroup>
  )
}
