import { Resizable } from '@rayscale/frontier'

const frame = {
  height: '14rem',
  border: 'var(--frontier-border-width) solid var(--frontier-color-border)',
  borderRadius: 'var(--frontier-radius-lg)',
  overflow: 'hidden',
}

const content = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  fontWeight: 'var(--frontier-font-weight-semibold)',
}

export default function Collapsible() {
  return (
    <div style={frame}>
      <Resizable.Root>
        <Resizable.Panel defaultSize={30} minSize={20} collapsible>
          <div style={content}>Sidebar</div>
        </Resizable.Panel>
        <Resizable.Handle grip aria-label="Resize sidebar" />
        <Resizable.Panel defaultSize={70}>
          <div style={content}>Content</div>
        </Resizable.Panel>
      </Resizable.Root>
    </div>
  )
}
