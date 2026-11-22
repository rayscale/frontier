import { Button, Tooltip } from '@rayscale/frontier'

export default function Placement() {
  return (
    <>
      <Tooltip content="Above" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Right" placement="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip content="Below" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left" placement="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
    </>
  )
}
