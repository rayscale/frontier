import { Button, Plus } from '@rayscale/frontier'

export default function Icons() {
  return (
    <>
      <Button size="icon-small" aria-label="Add">
        <Plus aria-hidden="true" />
      </Button>
      <Button size="icon" aria-label="Add">
        <Plus aria-hidden="true" />
      </Button>
      <Button size="icon-large" variant="outline" aria-label="Add">
        <Plus aria-hidden="true" />
      </Button>
    </>
  )
}
