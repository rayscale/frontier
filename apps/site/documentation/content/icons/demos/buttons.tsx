import { ArrowRight, Bell, Button, Download, Plus, Settings } from '@rayscale/frontier'

export default function Buttons() {
  return (
    <>
      <Button variant="outline">
        Continue
        <ArrowRight aria-hidden="true" />
      </Button>
      <Button variant="outline">
        <Plus aria-hidden="true" />
        New file
      </Button>
      <Button variant="outline">
        <Download aria-hidden="true" />
        Download
      </Button>
      <Button variant="outline">
        <Settings aria-hidden="true" />
        Settings
      </Button>
      <Button variant="outline">
        <Bell aria-hidden="true" />
        Notify me
      </Button>
    </>
  )
}
