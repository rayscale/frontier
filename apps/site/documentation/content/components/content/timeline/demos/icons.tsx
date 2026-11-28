import { CheckCircle, CircleX, Info, Timeline, TriangleAlert } from '@rayscale/frontier'

export default function Icons() {
  return (
    <Timeline aria-label="Deployment">
      <Timeline.Item tone="success">
        <Timeline.Indicator>
          <CheckCircle />
        </Timeline.Indicator>
        <Timeline.Content>
          <Timeline.Title>Deployed to production</Timeline.Title>
          <Timeline.Time dateTime="2025-03-04T10:12">10:12</Timeline.Time>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item tone="warning">
        <Timeline.Indicator>
          <TriangleAlert />
        </Timeline.Indicator>
        <Timeline.Content>
          <Timeline.Title>Slow tests</Timeline.Title>
          <Timeline.Description>The tests took twice as long as usual.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item tone="danger">
        <Timeline.Indicator>
          <CircleX />
        </Timeline.Indicator>
        <Timeline.Content>
          <Timeline.Title>First attempt failed</Timeline.Title>
          <Timeline.Description>A check on the build did not pass.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item tone="info">
        <Timeline.Indicator>
          <Info />
        </Timeline.Indicator>
        <Timeline.Content>
          <Timeline.Title>Build started</Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}
