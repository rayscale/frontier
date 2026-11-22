import { Avatar, AvatarGroup } from '@rayscale/frontier'

export default function Default() {
  return (
    <AvatarGroup>
      {['AM', 'JL', 'KR'].map((initials) => (
        <Avatar key={initials}>
          <Avatar.Fallback>{initials}</Avatar.Fallback>
        </Avatar>
      ))}
    </AvatarGroup>
  )
}
