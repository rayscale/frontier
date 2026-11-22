import { Button, Plus, Tooltip } from '@rayscale/frontier'

export default function IconOnly() {
  return (
    <Tooltip content="Add item">
      <Button size="icon" aria-label="Add item">
        <Plus aria-hidden="true" />
      </Button>
    </Tooltip>
  )
}
