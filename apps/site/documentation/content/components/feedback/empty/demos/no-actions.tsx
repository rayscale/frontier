import { Empty, SearchX } from '@rayscale/frontier'

export default function NoActions() {
  return (
    <Empty>
      <Empty.Header>
        <Empty.Media variant="icon">
          <SearchX />
        </Empty.Media>
        <Empty.Title>No results found</Empty.Title>
        <Empty.Description>Try a different word or remove a filter.</Empty.Description>
      </Empty.Header>
    </Empty>
  )
}
