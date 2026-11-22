import { Button, LoaderCircle } from '@rayscale/frontier'

export default function Progress() {
  return (
    <Button disabled variant="outline">
      <LoaderCircle animate aria-hidden="true" />
      Saving
    </Button>
  )
}
