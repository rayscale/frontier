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
  { label: 'Page', token: '--frontier-color-page' },
  { label: 'Surface', token: '--frontier-color-surface' },
  { label: 'Overlay', token: '--frontier-color-overlay' },
] as const

const textRoles = [
  { label: 'Text', token: '--frontier-color-text' },
  { label: 'Text muted', token: '--frontier-color-text-muted' },
  { label: 'Text subtle', token: '--frontier-color-text-subtle' },
  { label: 'Text disabled', token: '--frontier-color-text-disabled' },
  {
    label: 'Text inverse',
    token: '--frontier-color-text-inverse',
    background: '--frontier-color-primary',
  },
] as const

const stateRoles = [
  {
    label: 'Primary',
    fill: '--frontier-color-primary',
    text: '--frontier-color-on-primary',
  },
  {
    label: 'Highlight',
    fill: '--frontier-color-highlight',
    text: '--frontier-color-text',
  },
  {
    label: 'Pressed',
    fill: '--frontier-color-pressed',
    text: '--frontier-color-text',
  },
  {
    label: 'Selected',
    fill: '--frontier-color-selected',
    text: '--frontier-color-selected-text',
  },
  {
    label: 'Danger',
    fill: '--frontier-color-danger',
    text: '--frontier-color-on-danger',
  },
] as const

const typeScale = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const

const spacingSteps = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16] as const

const motionTokens = [
  { label: 'Fast', token: '--frontier-duration-fast' },
  { label: 'Base', token: '--frontier-duration-base' },
  { label: 'Medium', token: '--frontier-duration-medium' },
  { label: 'Enter', token: '--frontier-duration-enter' },
  { label: 'Exit', token: '--frontier-duration-exit' },
  { label: 'Ambient', token: '--frontier-duration-ambient' },
  { label: 'Spinner', token: '--frontier-duration-spinner' },
  { label: 'Standard', token: '--frontier-easing-standard' },
  { label: 'Exit', token: '--frontier-easing-exit' },
  { label: 'Ambient', token: '--frontier-easing-ambient' },
  { label: 'Spinner', token: '--frontier-easing-spinner' },
] as const

const mainStyle: CSSProperties = {
  boxSizing: 'border-box',
  width: 'min(72rem, 100%)',
  maxHeight: 'calc(100vh - var(--frontier-spacing-16))',
  overflow: 'auto',
  display: 'grid',
  gap: 'var(--frontier-spacing-10)',
  padding: 'var(--frontier-spacing-8)',
  color: 'var(--frontier-color-text)',
  background: 'var(--frontier-color-page)',
}

const sectionStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--frontier-spacing-4)',
}

const headingStyle: CSSProperties = {
  margin: 0,
  fontSize: 'var(--frontier-font-size-lg)',
  lineHeight: 'var(--frontier-line-height-lg)',
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--frontier-spacing-3)',
  gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
}

const tokenStyle: CSSProperties = {
  color: 'var(--frontier-color-text-muted)',
  fontFamily: 'var(--frontier-font-family-mono)',
  fontSize: 'var(--frontier-font-size-xs)',
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
      <header style={{ display: 'grid', gap: 'var(--frontier-spacing-2)' }}>
        <h1
          style={{
            margin: 0,
            fontSize: 'var(--frontier-font-size-2xl)',
            lineHeight: 'var(--frontier-line-height-2xl)',
          }}
        >
          Frontier styles
        </h1>
        <p
          style={{
            maxWidth: 'var(--frontier-reading-measure)',
            margin: 0,
            color: 'var(--frontier-color-text-muted)',
          }}
        >
          Design tokens available through the package stylesheet. Switch the mode from the toolbar.
        </p>
      </header>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Surfaces</h2>
        <div style={gridStyle}>
          {surfaces.map((surface) => (
            <div key={surface.token} style={{ display: 'grid', gap: 'var(--frontier-spacing-2)' }}>
              <div
                style={{
                  height: 'var(--frontier-spacing-16)',
                  background: `var(${surface.token})`,
                  border: 'var(--frontier-border-width) solid var(--frontier-color-border-subtle)',
                }}
              />
              <span style={{ fontSize: 'var(--frontier-font-size-sm)' }}>{surface.label}</span>
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
                gap: 'var(--frontier-spacing-2)',
                padding: 'var(--frontier-spacing-3)',
                background: `var(${'background' in role ? role.background : '--frontier-color-page'})`,
                border: 'var(--frontier-border-width) solid var(--frontier-color-border-subtle)',
              }}
            >
              <span
                style={{
                  color: `var(${role.token})`,
                  fontSize: 'var(--frontier-font-size-md)',
                  lineHeight: 'var(--frontier-line-height-md)',
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
                minHeight: 'var(--frontier-spacing-16)',
                padding: 'var(--frontier-spacing-3)',
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
        <div style={{ display: 'grid', gap: 'var(--frontier-spacing-3)' }}>
          {typeScale.map((step) => (
            <div
              key={step}
              style={{
                display: 'grid',
                gap: 'var(--frontier-spacing-1)',
                paddingBottom: 'var(--frontier-spacing-3)',
                borderBottom:
                  'var(--frontier-border-width) solid var(--frontier-color-border-subtle)',
              }}
            >
              <span
                style={{
                  fontSize: `var(--frontier-font-size-${step})`,
                  lineHeight: `var(--frontier-line-height-${step})`,
                }}
              >
                Frontier 0123
              </span>
              <code style={tokenStyle}>{step}</code>
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Spacing</h2>
        <div style={{ display: 'grid', gap: 'var(--frontier-spacing-2)' }}>
          {spacingSteps.map((step) => (
            <div
              key={step}
              style={{
                display: 'grid',
                gridTemplateColumns: '2rem 1fr',
                alignItems: 'center',
                gap: 'var(--frontier-spacing-3)',
              }}
            >
              <code style={tokenStyle}>{step}</code>
              <div
                style={{
                  width: `var(--frontier-spacing-${String(step)})`,
                  height: 'var(--frontier-spacing-2)',
                  background: 'var(--frontier-color-primary)',
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
                gap: 'var(--frontier-spacing-1)',
                padding: 'var(--frontier-spacing-3)',
                border: 'var(--frontier-border-width) solid var(--frontier-color-border-subtle)',
              }}
            >
              <span style={{ fontSize: 'var(--frontier-font-size-sm)' }}>{motion.label}</span>
              <code style={tokenStyle}>{motion.token}</code>
            </div>
          ))}
        </div>
      </section>
    </main>
  ),
}
