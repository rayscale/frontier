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

export default function Default() {
  return (
    <CursorCard>
      <CursorCard.Zone>
        <div style={zone}>Move the cursor here</div>
      </CursorCard.Zone>
      <CursorCard.Content>
        {({ x, y }) => `x ${String(Math.round(x))}, y ${String(Math.round(y))}`}
      </CursorCard.Content>
    </CursorCard>
  )
}
