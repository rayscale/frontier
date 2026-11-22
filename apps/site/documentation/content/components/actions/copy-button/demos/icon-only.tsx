import { CopyButton } from '@rayscale/frontier'

export default function IconOnly() {
  return (
    <CopyButton
      value="pnpm add @rayscale/frontier"
      label="Copy install command"
      showLabel={false}
    />
  )
}
