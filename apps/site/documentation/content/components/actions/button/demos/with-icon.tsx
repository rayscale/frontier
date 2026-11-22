import { ArrowRight, Button, Plus } from '@rayscale/frontier'

export default function WithIcon() {
  return (
    <>
      <Button>
        <Plus aria-hidden="true" />
        New file
      </Button>
      <Button variant="outline">
        Continue
        <ArrowRight aria-hidden="true" />
      </Button>
    </>
  )
}
