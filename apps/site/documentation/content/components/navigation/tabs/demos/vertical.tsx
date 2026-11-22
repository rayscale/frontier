import { Tabs } from '@rayscale/frontier'

export default function Vertical() {
  return (
    <Tabs defaultValue="profile" orientation="vertical">
      <Tabs.List>
        <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
        <Tabs.Trigger value="security">Security</Tabs.Trigger>
        <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="profile">Your name and photo.</Tabs.Content>
      <Tabs.Content value="security">Password and sign-in.</Tabs.Content>
      <Tabs.Content value="billing">Plan and invoices.</Tabs.Content>
    </Tabs>
  )
}
