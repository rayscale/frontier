import { Drawer } from '@rayscale/frontier'

export default function Sizes() {
  return (
    <>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Drawer key={size}>
          <Drawer.Trigger>{`Open ${size}`}</Drawer.Trigger>
          <Drawer.Content size={size}>
            <Drawer.Header>
              <Drawer.Title>{`A ${size} drawer`}</Drawer.Title>
              <Drawer.Description>The size sets its width.</Drawer.Description>
            </Drawer.Header>
          </Drawer.Content>
        </Drawer>
      ))}
    </>
  )
}
