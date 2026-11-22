import { Shortcut } from '@rayscale/frontier'

export default function Combination() {
  return (
    <span style={{ alignItems: 'center', display: 'inline-flex', gap: 4 }}>
      <Shortcut>Ctrl</Shortcut>
      <Shortcut>K</Shortcut>
    </span>
  )
}
