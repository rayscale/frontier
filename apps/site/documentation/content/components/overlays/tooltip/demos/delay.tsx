import { Button, Tooltip } from '@rayscale/frontier'

export default function Delay() {
  return (
    <>
      <Tooltip content="Shown right away" delay={0}>
        <Button variant="outline">No delay</Button>
      </Tooltip>
      <Tooltip content="Shown after a longer pause" delay={1000}>
        <Button variant="outline">One second</Button>
      </Tooltip>
    </>
  )
}
