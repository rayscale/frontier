import { ColorPicker } from '@rayscale/frontier'

const channels = ['red', 'green', 'blue'] as const

export default function Channels() {
  return (
    <ColorPicker.Root defaultValue="#2563eb">
      <div style={{ display: 'grid', gap: '1rem', width: '18rem' }}>
        {channels.map((channel) => (
          <div
            key={channel}
            style={{ display: 'grid', gridTemplateColumns: '1fr 5rem', gap: '1rem' }}
          >
            <ColorPicker.Slider channel={channel} />
            <ColorPicker.Input channel={channel} />
          </div>
        ))}
      </div>
    </ColorPicker.Root>
  )
}
