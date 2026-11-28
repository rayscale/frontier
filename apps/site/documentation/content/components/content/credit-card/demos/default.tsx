import { CreditCard } from '@rayscale/frontier'

export default function Default() {
  return (
    <CreditCard
      issuer="Frontier."
      number="4242 4242 4242 1234"
      holder="Olivia Rhye"
      expiry="06/28"
    />
  )
}
