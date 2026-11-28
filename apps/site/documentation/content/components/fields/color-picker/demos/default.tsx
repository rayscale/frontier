import { ColorPicker } from '@rayscale/frontier'

export default function Default() {
  return (
    <ColorPicker.Root defaultValue="#2563eb">
      <div style={{ display: 'grid', gap: '1rem', width: '16rem' }}>
        <ColorPicker.Area />
        <ColorPicker.Slider channel="hue" />
        <ColorPicker.Input label="Color" />
      </div>
    </ColorPicker.Root>
  )
}
