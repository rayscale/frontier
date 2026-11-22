import { Drawer } from '@rayscale/frontier'

export default function Sides() {
  return (
    <>
      {(['left', 'right', 'top', 'bottom'] as const).map((side) => (
        <Drawer key={side} side={side}>
          <Drawer.Trigger>{`From the ${side}`}</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{`Drawer from the ${side}`}</Drawer.Title>
              <Drawer.Description>It slides in from that edge.</Drawer.Description>
            </Drawer.Header>
          </Drawer.Content>
        </Drawer>
      ))}
    </>
  )
}
