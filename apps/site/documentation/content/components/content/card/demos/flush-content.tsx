import { Card, ScrollArea } from '@rayscale/frontier'

export default function FlushContent() {
  return (
    <Card padding="none" style={{ width: 360 }}>
      <ScrollArea style={{ height: 160 }}>
        <ul style={{ margin: 0, padding: 16 }}>
          {Array.from({ length: 12 }, (_, index) => (
            <li key={index}>Release note {index + 1}</li>
          ))}
        </ul>
      </ScrollArea>
    </Card>
  )
}
