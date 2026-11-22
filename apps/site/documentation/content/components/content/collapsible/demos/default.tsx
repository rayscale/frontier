import { Collapsible } from '@rayscale/frontier'

export default function Default() {
  return (
    <Collapsible>
      <Collapsible.Trigger>Shipping details</Collapsible.Trigger>
      <Collapsible.Content>Orders ship within two business days.</Collapsible.Content>
    </Collapsible>
  )
}
