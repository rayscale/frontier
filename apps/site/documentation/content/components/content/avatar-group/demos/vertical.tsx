import { Avatar, AvatarGroup } from '@rayscale/frontier'

export default function Vertical() {
  return (
    <AvatarGroup orientation="vertical" spacing={12}>
      {['AM', 'JL', 'KR'].map((initials) => (
        <Avatar key={initials}>
          <Avatar.Fallback>{initials}</Avatar.Fallback>
        </Avatar>
      ))}
    </AvatarGroup>
  )
}
