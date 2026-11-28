import { ColorSwatch } from '@rayscale/frontier'

const colors = ['#ef4444', '#f59e0b', '#22c55e', '#2563eb', '#9333ea']

export default function Palette() {
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {colors.map((color) => (
        <ColorSwatch key={color} color={color} size="lg" />
      ))}
    </div>
  )
}
