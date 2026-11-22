import { ScrollArea } from '@rayscale/frontier'

export default function Default() {
  return (
    <ScrollArea aria-label="Release notes" style={{ height: 160, width: 320 }}>
      {Array.from({ length: 16 }, (_, index) => (
        <p key={index}>Release note {index + 1}</p>
      ))}
    </ScrollArea>
  )
}
