import { ScrollArea } from '@rayscale/frontier'

export default function Horizontal() {
  return (
    <ScrollArea aria-label="Tags" orientation="horizontal" scrollbar="auto" style={{ width: 320 }}>
      <div style={{ display: 'flex', gap: 16, paddingBottom: 12, whiteSpace: 'nowrap' }}>
        {Array.from({ length: 14 }, (_, index) => (
          <span key={index}>Tag {index + 1}</span>
        ))}
      </div>
    </ScrollArea>
  )
}
