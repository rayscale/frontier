import { Empty, SearchX } from '@rayscale/frontier'

export default function Sizes() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['compact', 'default', 'spacious'] as const).map((size) => (
        <Empty key={size} size={size} variant="outline">
          <Empty.Header>
            <Empty.Media variant="icon">
              <SearchX />
            </Empty.Media>
            <Empty.Title>No results</Empty.Title>
            <Empty.Description>The {size} size.</Empty.Description>
          </Empty.Header>
        </Empty>
      ))}
    </div>
  )
}
