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

export default function Units() {
  return (
    <div style={frame}>
      <Resizable.Root>
        <Resizable.Panel defaultSize="12rem" minSize="8rem" maxSize="20rem">
          <div style={content}>Sidebar</div>
        </Resizable.Panel>
        <Resizable.Handle grip aria-label="Resize sidebar" />
        <Resizable.Panel>
          <div style={content}>Content</div>
        </Resizable.Panel>
      </Resizable.Root>
    </div>
  )
}
