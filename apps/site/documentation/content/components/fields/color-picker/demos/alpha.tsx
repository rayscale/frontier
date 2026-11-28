import { ColorPicker } from '@rayscale/frontier'

export default function Alpha() {
  return (
    <ColorPicker.Root alpha defaultValue="#2563ebcc">
      <div style={{ display: 'grid', gap: '1rem', width: '16rem' }}>
        <ColorPicker.Area />
        <ColorPicker.Slider channel="hue" />
        <ColorPicker.Slider channel="alpha" />
        <ColorPicker.Input label="Color" />
      </div>
    </ColorPicker.Root>
  )
}
