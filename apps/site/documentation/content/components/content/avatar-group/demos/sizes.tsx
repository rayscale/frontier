import { Avatar, AvatarGroup } from '@rayscale/frontier'

export default function Sizes() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <AvatarGroup key={size} size={size}>
          {['AM', 'JL', 'KR'].map((initials) => (
            <Avatar key={initials}>
              <Avatar.Fallback>{initials}</Avatar.Fallback>
            </Avatar>
          ))}
        </AvatarGroup>
      ))}
    </div>
  )
}
