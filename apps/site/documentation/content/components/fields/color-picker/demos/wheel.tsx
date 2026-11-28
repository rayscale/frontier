import { ColorPicker } from '@rayscale/frontier'

export default function Wheel() {
  return (
    <ColorPicker.Root defaultValue="#2563eb">
      <div style={{ display: 'grid', justifyItems: 'center', gap: '1rem', width: '16rem' }}>
        <ColorPicker.Wheel />
        <ColorPicker.Slider channel="brightness" />
        <ColorPicker.Input label="Color" />
      </div>
    </ColorPicker.Root>
  )
}
