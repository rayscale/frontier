import { Button, HoverCard } from '@rayscale/frontier'

const sides = ['top', 'right', 'bottom', 'left'] as const

export default function Placement() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      {sides.map((side) => (
        <HoverCard key={side}>
          <HoverCard.Trigger>
            <Button variant="outline">{side}</Button>
          </HoverCard.Trigger>
          <HoverCard.Content side={side}>
            This card opens on the {side} side of its trigger.
          </HoverCard.Content>
        </HoverCard>
      ))}
    </div>
  )
}
