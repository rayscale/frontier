import { CreditCard } from '@rayscale/frontier'

const card = { issuer: 'Frontier.', holder: 'Olivia Rhye', expiry: '06/28' }

export default function Variants() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <CreditCard {...card} number="4242 4242 4242 1234" size="small" variant="primary" />
      <CreditCard {...card} number="5555 5555 5555 4444" size="small" variant="inverse" />
      <CreditCard {...card} number="3782 822463 10005" size="small" variant="subtle" />
    </div>
  )
}
