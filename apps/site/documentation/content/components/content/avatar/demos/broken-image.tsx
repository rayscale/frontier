import { Avatar } from '@rayscale/frontier'

export default function BrokenImage() {
  return (
    <Avatar>
      <Avatar.Image src="/missing-photo.jpg" alt="" />
      <Avatar.Fallback>AM</Avatar.Fallback>
    </Avatar>
  )
}
