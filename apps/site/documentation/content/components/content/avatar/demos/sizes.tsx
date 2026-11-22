import { Avatar } from '@rayscale/frontier'

export default function Sizes() {
  return (
    <>
      <Avatar size="small">
        <Avatar.Fallback>S</Avatar.Fallback>
      </Avatar>
      <Avatar size="medium">
        <Avatar.Fallback>M</Avatar.Fallback>
      </Avatar>
      <Avatar size="large">
        <Avatar.Fallback>L</Avatar.Fallback>
      </Avatar>
      <Avatar size="extra-large">
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar>
    </>
  )
}
