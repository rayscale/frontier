import { ColorPicker } from '@rayscale/frontier'

const colors = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#22c55e',
  '#14b8a6',
  '#2563eb',
  '#9333ea',
  '#db2777',
]

export default function Swatches() {
  return (
    <ColorPicker.Root defaultValue="#2563eb">
      <div style={{ display: 'grid', gap: '1rem', width: '16rem' }}>
        <ColorPicker.Swatches colors={colors} />
        <ColorPicker.Input label="Color" />
      </div>
    </ColorPicker.Root>
  )
}
