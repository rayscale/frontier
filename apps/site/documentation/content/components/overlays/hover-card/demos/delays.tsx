import { Button, HoverCard } from '@rayscale/frontier'

export default function Delays() {
  return (
    <HoverCard openDelay={0} closeDelay={1000}>
      <HoverCard.Trigger>
        <Button variant="outline">Hover me</Button>
      </HoverCard.Trigger>
      <HoverCard.Content>The card waits a second before it closes.</HoverCard.Content>
    </HoverCard>
  )
}
