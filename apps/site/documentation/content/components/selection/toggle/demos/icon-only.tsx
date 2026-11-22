import { Bold, Italic, Toggle, Underline } from '@rayscale/frontier'

export default function IconOnly() {
  return (
    <>
      <Toggle aria-label="Bold">
        <Bold aria-hidden="true" />
      </Toggle>
      <Toggle aria-label="Italic">
        <Italic aria-hidden="true" />
      </Toggle>
      <Toggle aria-label="Underline">
        <Underline aria-hidden="true" />
      </Toggle>
    </>
  )
}
