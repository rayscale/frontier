import { Button, Plus, Tooltip } from '@rayscale/frontier'

export default function SymbolOnly() {
  return (
    <Tooltip content="Add item">
      <Button size="symbol" aria-label="Add item">
        <Plus aria-hidden="true" />
      </Button>
    </Tooltip>
  )
}
