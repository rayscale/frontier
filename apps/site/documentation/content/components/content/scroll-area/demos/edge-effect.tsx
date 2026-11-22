import { ScrollArea } from '@rayscale/frontier'

export default function EdgeEffect() {
  return (
    <ScrollArea aria-label="Release notes" edgeEffect="fade" style={{ height: 160, width: 320 }}>
      {Array.from({ length: 16 }, (_, index) => (
        <p key={index}>Release note {index + 1}</p>
      ))}
    </ScrollArea>
  )
}
