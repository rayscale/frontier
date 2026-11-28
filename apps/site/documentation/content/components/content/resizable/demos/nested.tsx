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

export default function Nested() {
  return (
    <div style={frame}>
      <Resizable.Root>
        <Resizable.Panel defaultSize={30} minSize={15}>
          <div style={content}>Sidebar</div>
        </Resizable.Panel>
        <Resizable.Handle grip aria-label="Resize sidebar" />
        <Resizable.Panel defaultSize={70} minSize={30}>
          <Resizable.Root orientation="vertical">
            <Resizable.Panel defaultSize={60} minSize={20}>
              <div style={content}>Editor</div>
            </Resizable.Panel>
            <Resizable.Handle grip aria-label="Resize editor" />
            <Resizable.Panel defaultSize={40} minSize={20}>
              <div style={content}>Terminal</div>
            </Resizable.Panel>
          </Resizable.Root>
        </Resizable.Panel>
      </Resizable.Root>
    </div>
  )
}
