import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'

const meta = {
  title: 'Foundations/Styles',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta

type TStory = StoryObj<typeof meta>

const surfaces = [
  { label: 'Page', token: '--metric-color-page' },
  { label: 'Surface', token: '--metric-color-surface' },
  { label: 'Overlay', token: '--metric-color-overlay' },
] as const

const textRoles = [
  { label: 'Text', token: '--metric-color-text' },
  { label: 'Text muted', token: '--metric-color-text-muted' },
  { label: 'Text subtle', token: '--metric-color-text-subtle' },
  { label: 'Text disabled', token: '--metric-color-text-disabled' },
  {
    label: 'Text inverse',
    token: '--metric-color-text-inverse',
    background: '--metric-color-primary',
  },
] as const

const stateRoles = [
  {
    label: 'Primary',
    fill: '--metric-color-primary',
    text: '--metric-color-on-primary',
  },
  {
    label: 'Highlight',
    fill: '--metric-color-highlight',
    text: '--metric-color-text',
  },
  {
    label: 'Pressed',
    fill: '--metric-color-pressed',
    text: '--metric-color-text',
  },
  {
    label: 'Selected',
    fill: '--metric-color-selected',
    text: '--metric-color-selected-text',
  },
  {
    label: 'Danger',
    fill: '--metric-color-danger',
    text: '--metric-color-on-danger',
  },
] as const

const typeScale = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const

const spacingSteps = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16] as const

const motionTokens = [
  { label: 'Fast', token: '--metric-duration-fast' },
  { label: 'Base', token: '--metric-duration-base' },
  { label: 'Medium', token: '--metric-duration-medium' },
  { label: 'Enter', token: '--metric-duration-enter' },
  { label: 'Exit', token: '--metric-duration-exit' },
  { label: 'Ambient', token: '--metric-duration-ambient' },
  { label: 'Spinner', token: '--metric-duration-spinner' },
  { label: 'Standard', token: '--metric-easing-standard' },
  { label: 'Exit', token: '--metric-easing-exit' },
  { label: 'Ambient', token: '--metric-easing-ambient' },
  { label: 'Spinner', token: '--metric-easing-spinner' },
] as const

const mainStyle: CSSProperties = {
  boxSizing: 'border-box',
  width: 'min(72rem, 100%)',
  maxHeight: 'calc(100vh - var(--metric-spacing-16))',
  overflow: 'auto',
  display: 'grid',
  gap: 'var(--metric-spacing-10)',
  padding: 'var(--metric-spacing-8)',
  color: 'var(--metric-color-text)',
  background: 'var(--metric-color-page)',
}

const sectionStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--metric-spacing-4)',
}

const headingStyle: CSSProperties = {
  margin: 0,
  fontSize: 'var(--metric-font-size-lg)',
  lineHeight: 'var(--metric-line-height-lg)',
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--metric-spacing-3)',
  gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
}

const tokenStyle: CSSProperties = {
  color: 'var(--metric-color-text-muted)',
  fontFamily: 'var(--metric-font-family-mono)',
  fontSize: 'var(--metric-font-size-xs)',
}

export const tokens: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Shows the color, typography, spacing, and motion tokens in the active mode.',
      },
    },
  },
  render: () => (
    <main style={mainStyle}>
      <header style={{ display: 'grid', gap: 'var(--metric-spacing-2)' }}>
        <h1
          style={{
            margin: 0,
            fontSize: 'var(--metric-font-size-2xl)',
            lineHeight: 'var(--metric-line-height-2xl)',
          }}
        >
          Metric styles
        </h1>
        <p
          style={{
            maxWidth: 'var(--metric-reading-measure)',
            margin: 0,
            color: 'var(--metric-color-text-muted)',
          }}
        >
          Design tokens available through the package stylesheet. Switch the mode from the toolbar.
        </p>
      </header>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Surfaces</h2>
        <div style={gridStyle}>
          {surfaces.map((surface) => (
            <div key={surface.token} style={{ display: 'grid', gap: 'var(--metric-spacing-2)' }}>
              <div
                style={{
                  height: 'var(--metric-spacing-16)',
                  background: `var(${surface.token})`,
                  border: 'var(--metric-border-width) solid var(--metric-color-border-subtle)',
                }}
              />
              <span style={{ fontSize: 'var(--metric-font-size-sm)' }}>{surface.label}</span>
              <code style={tokenStyle}>{surface.token}</code>
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Text</h2>
        <div style={gridStyle}>
          {textRoles.map((role) => (
            <div
              key={role.token}
              style={{
                display: 'grid',
                gap: 'var(--metric-spacing-2)',
                padding: 'var(--metric-spacing-3)',
                background: `var(${'background' in role ? role.background : '--metric-color-page'})`,
                border: 'var(--metric-border-width) solid var(--metric-color-border-subtle)',
              }}
            >
              <span
                style={{
                  color: `var(${role.token})`,
                  fontSize: 'var(--metric-font-size-md)',
                  lineHeight: 'var(--metric-line-height-md)',
                }}
              >
                The quick brown fox
              </span>
              <code style={tokenStyle}>{role.token}</code>
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>States</h2>
        <div style={gridStyle}>
          {stateRoles.map((role) => (
            <div
              key={role.fill}
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: 'var(--metric-spacing-16)',
                padding: 'var(--metric-spacing-3)',
                color: `var(${role.text})`,
                background: `var(${role.fill})`,
              }}
            >
              {role.label}
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Type scale</h2>
        <div style={{ display: 'grid', gap: 'var(--metric-spacing-3)' }}>
          {typeScale.map((step) => (
            <div
              key={step}
              style={{
                display: 'grid',
                gap: 'var(--metric-spacing-1)',
                paddingBottom: 'var(--metric-spacing-3)',
                borderBottom: 'var(--metric-border-width) solid var(--metric-color-border-subtle)',
              }}
            >
              <span
                style={{
                  fontSize: `var(--metric-font-size-${step})`,
                  lineHeight: `var(--metric-line-height-${step})`,
                }}
              >
                Metric 0123
              </span>
              <code style={tokenStyle}>{step}</code>
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Spacing</h2>
        <div style={{ display: 'grid', gap: 'var(--metric-spacing-2)' }}>
          {spacingSteps.map((step) => (
            <div
              key={step}
              style={{
                display: 'grid',
                gridTemplateColumns: '2rem 1fr',
                alignItems: 'center',
                gap: 'var(--metric-spacing-3)',
              }}
            >
              <code style={tokenStyle}>{step}</code>
              <div
                style={{
                  width: `var(--metric-spacing-${String(step)})`,
                  height: 'var(--metric-spacing-2)',
                  background: 'var(--metric-color-primary)',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Motion</h2>
        <div style={gridStyle}>
          {motionTokens.map((motion) => (
            <div
              key={motion.token}
              style={{
                display: 'grid',
                gap: 'var(--metric-spacing-1)',
                padding: 'var(--metric-spacing-3)',
                border: 'var(--metric-border-width) solid var(--metric-color-border-subtle)',
              }}
            >
              <span style={{ fontSize: 'var(--metric-font-size-sm)' }}>{motion.label}</span>
              <code style={tokenStyle}>{motion.token}</code>
            </div>
          ))}
        </div>
      </section>
    </main>
  ),
}
