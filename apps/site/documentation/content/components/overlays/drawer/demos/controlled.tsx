import { Button, Drawer } from '@rayscale/frontier'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Open drawer
      </Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Controlled drawer</Drawer.Title>
            <Drawer.Description>Your component owns the open state.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Footer>
            <Drawer.Close>Done</Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
      <p>{open ? 'The drawer is open.' : 'The drawer is closed.'}</p>
    </>
  )
}
