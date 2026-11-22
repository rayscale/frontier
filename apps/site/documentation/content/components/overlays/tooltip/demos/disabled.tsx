import { Button, Tooltip } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <Tooltip content="This tooltip never shows" disabled>
      <Button variant="outline">No tooltip</Button>
    </Tooltip>
  )
}
