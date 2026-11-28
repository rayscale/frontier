import { Rating } from '@rayscale/frontier'

export default function Sizes() {
  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Rating label="Small" defaultValue={3} size="sm" />
      <Rating label="Medium" defaultValue={3} size="md" />
      <Rating label="Large" defaultValue={3} size="lg" />
    </div>
  )
}
