import { Sheet } from '@rayscale/frontier'

export default function Sides() {
  return (
    <>
      {(['left', 'right', 'top', 'bottom'] as const).map((side) => (
        <Sheet key={side} side={side}>
          <Sheet.Trigger>{`From the ${side}`}</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Header>
              <Sheet.Title>{`Sheet from the ${side}`}</Sheet.Title>
              <Sheet.Description>It slides in from that edge.</Sheet.Description>
            </Sheet.Header>
          </Sheet.Content>
        </Sheet>
      ))}
    </>
  )
}
