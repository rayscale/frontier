import { Collapsible } from '@rayscale/frontier'

export default function OpenByDefault() {
  return (
    <Collapsible defaultOpen>
      <Collapsible.Trigger>Shipping details</Collapsible.Trigger>
      <Collapsible.Content>Orders ship within two business days.</Collapsible.Content>
    </Collapsible>
  )
}
