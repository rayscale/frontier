import { ColorPicker } from '@rayscale/frontier'

const formats = ['hex', 'rgb', 'hsl', 'oklch'] as const

export default function Formats() {
  return (
    <ColorPicker.Root defaultValue="#2563eb">
      <div style={{ display: 'grid', gap: '1rem', width: '18rem' }}>
        <ColorPicker.Area />
        {formats.map((format) => (
          <ColorPicker.Input key={format} format={format} label={format} />
        ))}
      </div>
    </ColorPicker.Root>
  )
}
