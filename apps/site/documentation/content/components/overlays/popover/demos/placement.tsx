import { Popover } from '@rayscale/frontier'

export default function Placement() {
  return (
    <>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover key={side}>
          <Popover.Trigger>{side}</Popover.Trigger>
          <Popover.Content side={side}>
            <Popover.Header>
              <Popover.Title>{`Placed on the ${side}`}</Popover.Title>
            </Popover.Header>
          </Popover.Content>
        </Popover>
      ))}
    </>
  )
}
