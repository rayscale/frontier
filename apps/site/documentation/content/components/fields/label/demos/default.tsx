import { Label } from '@rayscale/frontier'

export default function Default() {
  return (
    <>
      <Label htmlFor="label-email">Email address</Label>
      <input id="label-email" type="email" placeholder="you@example.com" />
    </>
  )
}
