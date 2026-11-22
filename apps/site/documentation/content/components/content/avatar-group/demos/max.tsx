import { Avatar, AvatarGroup } from '@rayscale/frontier'

const people = ['AM', 'JL', 'KR', 'DP', 'SN', 'TW']

export default function Max() {
  return (
    <AvatarGroup max={3}>
      {people.map((initials) => (
        <Avatar key={initials}>
          <Avatar.Fallback>{initials}</Avatar.Fallback>
        </Avatar>
      ))}
    </AvatarGroup>
  )
}
