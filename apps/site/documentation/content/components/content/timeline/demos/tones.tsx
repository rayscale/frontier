import { Timeline } from '@rayscale/frontier'

const tones = ['neutral', 'info', 'success', 'warning', 'danger'] as const

export default function Tones() {
  return (
    <Timeline aria-label="Tones">
      {tones.map((tone) => (
        <Timeline.Item key={tone} tone={tone}>
          <Timeline.Indicator />
          <Timeline.Content>
            <Timeline.Title>{tone}</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  )
}
