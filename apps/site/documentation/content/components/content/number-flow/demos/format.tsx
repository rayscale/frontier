import { NumberFlow } from '@rayscale/frontier'

export default function Format() {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <NumberFlow value={1299.5} format={{ style: 'currency', currency: 'USD' }} />
      <NumberFlow value={0.42} format={{ style: 'percent' }} />
      <NumberFlow value={1299.5} locale="de-DE" format={{ style: 'currency', currency: 'EUR' }} />
    </div>
  )
}
