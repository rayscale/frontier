import { Info, Timeline } from '@rayscale/frontier'

export default function Horizontal() {
  return (
    <Timeline aria-label="Order history" orientation="horizontal">
      <Timeline.Item tone="success">
        <Timeline.Indicator />
        <Timeline.Content>
          <Timeline.Title>Order placed</Timeline.Title>
          <Timeline.Time dateTime="2025-03-01">March 1</Timeline.Time>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item tone="success">
        <Timeline.Indicator />
        <Timeline.Content>
          <Timeline.Title>Shipped</Timeline.Title>
          <Timeline.Time dateTime="2025-03-02">March 2</Timeline.Time>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item tone="info">
        <Timeline.Indicator>
          <Info />
        </Timeline.Indicator>
        <Timeline.Content>
          <Timeline.Title>Out for delivery</Timeline.Title>
          <Timeline.Time dateTime="2025-03-04">March 4</Timeline.Time>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Indicator />
        <Timeline.Content>
          <Timeline.Title>Delivered</Timeline.Title>
          <Timeline.Description>Expected tomorrow.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}
