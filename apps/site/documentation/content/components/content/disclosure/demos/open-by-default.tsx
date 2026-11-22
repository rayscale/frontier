import { Disclosure } from '@rayscale/frontier'

export default function OpenByDefault() {
  return (
    <Disclosure title="Shipping details" defaultOpen>
      Orders ship within two business days.
    </Disclosure>
  )
}
