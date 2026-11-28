import { ColorSwatch } from '@rayscale/frontier'

export default function Transparent() {
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {[100, 70, 40, 10].map((alpha) => (
        <ColorSwatch
          key={alpha}
          color={`rgb(37 99 235 / ${String(alpha)}%)`}
          label={`Blue at ${String(alpha)}%`}
          size="lg"
        />
      ))}
    </div>
  )
}
