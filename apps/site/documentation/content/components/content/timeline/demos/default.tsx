import { Timeline } from '@rayscale/frontier'

export default function Default() {
  return (
    <Timeline aria-label="Order history">
      <Timeline.Item tone="success">
        <Timeline.Indicator />
        <Timeline.Content>
          <Timeline.Title>Delivered</Timeline.Title>
          <Timeline.Time dateTime="2025-03-04">March 4, 10:12</Timeline.Time>
          <Timeline.Description>Left at the front door.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Indicator />
        <Timeline.Content>
          <Timeline.Title>Shipped</Timeline.Title>
          <Timeline.Time dateTime="2025-03-02">March 2, 17:45</Timeline.Time>
          <Timeline.Description>Handed to the carrier.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Indicator />
        <Timeline.Content>
          <Timeline.Title>Order placed</Timeline.Title>
          <Timeline.Time dateTime="2025-03-01">March 1, 09:02</Timeline.Time>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}
