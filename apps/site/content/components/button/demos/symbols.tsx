import { Button, Plus } from '@rayscale/frontier'

export default function Symbols() {
  return (
    <>
      <Button size="symbol-small" aria-label="Add">
        <Plus aria-hidden="true" />
      </Button>
      <Button size="symbol" aria-label="Add">
        <Plus aria-hidden="true" />
      </Button>
      <Button size="symbol-large" variant="outline" aria-label="Add">
        <Plus aria-hidden="true" />
      </Button>
    </>
  )
}
