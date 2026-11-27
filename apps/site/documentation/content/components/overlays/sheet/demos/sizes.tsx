import { Sheet } from '@rayscale/frontier'

export default function Sizes() {
  return (
    <>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Sheet key={size}>
          <Sheet.Trigger>{`Open ${size}`}</Sheet.Trigger>
          <Sheet.Content size={size}>
            <Sheet.Header>
              <Sheet.Title>{`A ${size} sheet`}</Sheet.Title>
              <Sheet.Description>The size sets its width.</Sheet.Description>
            </Sheet.Header>
          </Sheet.Content>
        </Sheet>
      ))}
    </>
  )
}
