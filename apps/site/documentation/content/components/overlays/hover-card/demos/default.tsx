import { Avatar, HoverCard, Link } from '@rayscale/frontier'

export default function Default() {
  return (
    <HoverCard>
      <HoverCard.Trigger>
        <Link href="#ana">@ana</Link>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Avatar>
            <Avatar.Fallback>AM</Avatar.Fallback>
          </Avatar>
          <div style={{ display: 'grid', gap: '0.25rem' }}>
            <strong>Ana Morales</strong>
            <span style={{ color: 'var(--frontier-color-text-muted)', fontSize: '0.875rem' }}>
              Designs the system and keeps its tokens honest.
            </span>
          </div>
        </div>
      </HoverCard.Content>
    </HoverCard>
  )
}
