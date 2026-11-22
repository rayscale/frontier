import { CopyButton } from '@rayscale/frontier'

export default function Labels() {
  return (
    <CopyButton
      value="pnpm add @rayscale/frontier"
      label="Copy command"
      copiedLabel="Command copied"
    />
  )
}
