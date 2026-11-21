import { Tabs } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<string | null>('inbox')

  return (
    <>
      <p>Selected tab: {value}</p>
      <Tabs value={value} onValueChange={setValue}>
        <Tabs.List>
          <Tabs.Trigger value="inbox">Inbox</Tabs.Trigger>
          <Tabs.Trigger value="sent">Sent</Tabs.Trigger>
          <Tabs.Trigger value="drafts">Drafts</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="inbox">Messages waiting for you.</Tabs.Content>
        <Tabs.Content value="sent">Messages you sent.</Tabs.Content>
        <Tabs.Content value="drafts">Messages you have not sent.</Tabs.Content>
      </Tabs>
    </>
  )
}
