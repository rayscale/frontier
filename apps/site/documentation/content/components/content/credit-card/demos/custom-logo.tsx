import { CreditCard } from '@rayscale/frontier'

export default function CustomLogo() {
  return (
    <CreditCard
      brand="generic"
      logo={<strong>Local Pay</strong>}
      issuer="Frontier."
      number="9999 0000 1111 2222"
      holder="Olivia Rhye"
      expiry="06/28"
    />
  )
}
