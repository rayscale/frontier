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

export default function Grip() {
  return (
    <div style={frame}>
      <Resizable.Root>
        <Resizable.Panel defaultSize={50} minSize={20}>
          <div style={content}>One</div>
        </Resizable.Panel>
        <Resizable.Handle grip aria-label="Resize panels" />
        <Resizable.Panel defaultSize={50} minSize={20}>
          <div style={content}>Two</div>
        </Resizable.Panel>
      </Resizable.Root>
    </div>
  )
}
