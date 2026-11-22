import { Disclosure } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <Disclosure title="Shipping details" disabled>
      Orders ship within two business days.
    </Disclosure>
  )
}
