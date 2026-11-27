import { CursorCard } from '@rayscale/frontier'

const zone = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '10rem',
  border: 'var(--frontier-border-width) dashed var(--frontier-color-border-strong)',
  borderRadius: 'var(--frontier-radius-lg)',
  color: 'var(--frontier-color-text-muted)',
}

export default function Delay() {
  return (
    <CursorCard openDelay={500} closeDelay={200}>
      <CursorCard.Zone>
        <div style={zone}>Stay here for half a second</div>
      </CursorCard.Zone>
      <CursorCard.Content>The card opened after a delay.</CursorCard.Content>
    </CursorCard>
  )
}
