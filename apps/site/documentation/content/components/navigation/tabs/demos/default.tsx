import { Tabs } from '@rayscale/frontier'

export default function Default() {
  return (
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
        <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">A summary of the project.</Tabs.Content>
      <Tabs.Content value="analytics">Visits and sign-ups over time.</Tabs.Content>
      <Tabs.Content value="reports">Reports ready to download.</Tabs.Content>
    </Tabs>
  )
}
