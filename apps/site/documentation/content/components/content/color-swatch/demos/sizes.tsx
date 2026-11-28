import { ColorSwatch } from '@rayscale/frontier'

export default function Sizes() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <ColorSwatch color="#2563eb" size="sm" />
      <ColorSwatch color="#2563eb" size="md" />
      <ColorSwatch color="#2563eb" size="lg" />
    </div>
  )
}
