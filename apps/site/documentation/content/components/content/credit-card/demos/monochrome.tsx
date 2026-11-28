import { CreditCard } from '@rayscale/frontier'

export default function Monochrome() {
  return (
    <CreditCard
      monochrome
      issuer="Frontier."
      number="5555 5555 5555 4444"
      holder="Olivia Rhye"
      expiry="06/28"
    />
  )
}
