import { CopyButton } from '@rayscale/frontier'

export default function Variants() {
  return (
    <>
      <CopyButton value="Primary" variant="primary" />
      <CopyButton value="Secondary" variant="secondary" />
      <CopyButton value="Outline" variant="outline" />
      <CopyButton value="Ghost" variant="ghost" />
    </>
  )
}
