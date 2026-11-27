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

export default function Vertical() {
  return (
    <div style={frame}>
      <Resizable.Root orientation="vertical">
        <Resizable.Panel defaultSize={30} minSize={15}>
          <div style={content}>Header</div>
        </Resizable.Panel>
        <Resizable.Handle grip aria-label="Resize header" />
        <Resizable.Panel defaultSize={70} minSize={15}>
          <div style={content}>Content</div>
        </Resizable.Panel>
      </Resizable.Root>
    </div>
  )
}
