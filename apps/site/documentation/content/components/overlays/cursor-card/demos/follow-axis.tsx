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

export default function FollowAxis() {
  return (
    <CursorCard followAxis="x">
      <CursorCard.Zone>
        <div style={zone}>Move the cursor along this zone</div>
      </CursorCard.Zone>
      <CursorCard.Content side="top">
        {({ x, width }) => `${String(Math.round((x / width) * 100))}% across`}
      </CursorCard.Content>
    </CursorCard>
  )
}
