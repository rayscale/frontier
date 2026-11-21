import { Tabs } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <Tabs defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="team" disabled>
          Team
        </Tabs.Trigger>
        <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">Your account settings.</Tabs.Content>
      <Tabs.Content value="team">Team settings are not available.</Tabs.Content>
      <Tabs.Content value="billing">Plan and invoices.</Tabs.Content>
    </Tabs>
  )
}
