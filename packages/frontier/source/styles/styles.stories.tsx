import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties, ReactElement } from 'react'

const meta = {
  title: 'Foundations/Styles',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta

type TStory = StoryObj<typeof meta>

interface TSwatch {
  label: string
  token: string
  text?: string
}

const surfaces: TSwatch[] = [
  { label: 'Background', token: '--frontier-color-background' },
  { label: 'Surface', token: '--frontier-color-surface' },
  { label: 'Raised', token: '--frontier-color-surface-raised' },
  { label: 'Floating', token: '--frontier-color-surface-floating' },
  { label: 'Sunken', token: '--frontier-color-surface-sunken' },
  { label: 'Hover', token: '--frontier-color-surface-hover' },
  { label: 'Active', token: '--frontier-color-surface-active' },
  { label: 'Highlight', token: '--frontier-color-surface-highlight' },
]

const fills: TSwatch[] = [
  {
    label: 'Primary',
    token: '--frontier-color-primary',
    text: '--frontier-color-on-primary',
  },
  {
    label: 'Primary hover',
    token: '--frontier-color-primary-hover',
    text: '--frontier-color-on-primary',
  },
  {
    label: 'Primary active',
    token: '--frontier-color-primary-active',
    text: '--frontier-color-on-primary',
  },
  {
    label: 'Secondary',
    token: '--frontier-color-secondary',
    text: '--frontier-color-on-secondary',
  },
  {
    label: 'Secondary hover',
    token: '--frontier-color-secondary-hover',
    text: '--frontier-color-on-secondary',
  },
  {
    label: 'Secondary active',
    token: '--frontier-color-secondary-active',
    text: '--frontier-color-on-secondary',
  },
  {
    label: 'Disabled',
    token: '--frontier-color-disabled',
    text: '--frontier-color-on-disabled',
  },
]

const tones: TSwatch[] = [
  { label: 'Danger', token: '--frontier-color-danger-subtle', text: '--frontier-color-danger' },
  { label: 'Success', token: '--frontier-color-success-subtle', text: '--frontier-color-success' },
  { label: 'Warning', token: '--frontier-color-warning-subtle', text: '--frontier-color-warning' },
  { label: 'Information', token: '--frontier-color-info-subtle', text: '--frontier-color-info' },
]

const textRoles: TSwatch[] = [
  { label: 'Text', token: '--frontier-color-text' },
  { label: 'Text muted', token: '--frontier-color-text-muted' },
  { label: 'Text subtle', token: '--frontier-color-text-subtle' },
  { label: 'Text disabled', token: '--frontier-color-text-disabled' },
]

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const
const weights = ['regular', 'medium', 'semibold', 'bold'] as const
const spacingSteps = ['1', '2', '3', '4', '5', '6', '8', '10', '12', '16'] as const
const radii = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const
const shadows = ['sm', 'md', 'lg'] as const
const blurs = ['none', 'subtle', 'medium', 'strong', 'intense'] as const
const controls = ['small', 'medium', 'large'] as const
const durations = ['fast', 'base', 'medium', 'slow', 'enter', 'exit', 'minimum', 'delay'] as const
const easings = ['standard', 'spring', 'emphasized-decelerate', 'emphasized-accelerate'] as const

const mainStyle: CSSProperties = {
  boxSizing: 'border-box',
  display: 'grid',
  gap: 'var(--frontier-spacing-10)',
  width: 'min(72rem, 100%)',
  maxHeight: 'calc(100vh - var(--frontier-spacing-16))',
  padding: 'var(--frontier-spacing-8)',
  overflow: 'auto',
  background: 'var(--frontier-color-background)',
  color: 'var(--frontier-color-text)',
  fontFamily: 'var(--frontier-font-family)',
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--frontier-spacing-3)',
  gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
}

const tokenStyle: CSSProperties = {
  color: 'var(--frontier-color-text-muted)',
  fontFamily: 'var(--frontier-font-family-mono)',
  fontSize: 'var(--frontier-font-size-xs)',
}

function Section(props: { title: string; children: ReactElement | ReactElement[] }): ReactElement {
  return (
    <section style={{ display: 'grid', gap: 'var(--frontier-spacing-4)' }}>
      <h2
        style={{
          margin: 0,
          fontSize: 'var(--frontier-font-size-lg)',
          fontWeight: 'var(--frontier-font-weight-semibold)',
        }}
      >
        {props.title}
      </h2>
      {props.children}
    </section>
  )
}

function Swatches(props: { items: TSwatch[] }): ReactElement {
  return (
    <div style={gridStyle}>
      {props.items.map((item) => (
        <div key={item.token} style={{ display: 'grid', gap: 'var(--frontier-spacing-2)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'var(--frontier-spacing-16)',
              border: 'var(--frontier-border-width-subtle) solid var(--frontier-color-border)',
              borderRadius: 'var(--frontier-radius-md)',
              background: `var(${item.token})`,
              color: item.text ? `var(${item.text})` : 'var(--frontier-color-text)',
            }}
          >
            {item.label}
          </div>
          <span style={tokenStyle}>{item.token}</span>
        </div>
      ))}
    </div>
  )
}

function Labeled(props: { token: string; children: ReactElement }): ReactElement {
  return (
    <div style={{ display: 'grid', gap: 'var(--frontier-spacing-2)', justifyItems: 'start' }}>
      {props.children}
      <span style={tokenStyle}>{props.token}</span>
    </div>
  )
}

export const Tokens: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows the color, typography, spacing, shape, depth, control, and motion tokens in the active mode.',
      },
    },
  },
  render: () => (
    <main style={mainStyle}>
      <Section title="Surfaces">
        <Swatches items={surfaces} />
      </Section>
      <Section title="Fills">
        <Swatches items={fills} />
      </Section>
      <Section title="Tones">
        <Swatches items={tones} />
      </Section>
      <Section title="Text">
        <div style={gridStyle}>
          {textRoles.map((role) => (
            <Labeled key={role.token} token={role.token}>
              <span style={{ color: `var(${role.token})` }}>{role.label}</span>
            </Labeled>
          ))}
        </div>
      </Section>
      <Section title="Typography">
        <div style={{ display: 'grid', gap: 'var(--frontier-spacing-3)' }}>
          {sizes.map((size) => (
            <Labeled key={size} token={`--frontier-font-size-${size}`}>
              <span style={{ fontSize: `var(--frontier-font-size-${size})` }}>
                The quick brown fox
              </span>
            </Labeled>
          ))}
          {weights.map((weight) => (
            <Labeled key={weight} token={`--frontier-font-weight-${weight}`}>
              <span style={{ fontWeight: `var(--frontier-font-weight-${weight})` }}>
                The quick brown fox
              </span>
            </Labeled>
          ))}
        </div>
      </Section>
      <Section title="Spacing">
        <div style={{ display: 'grid', gap: 'var(--frontier-spacing-2)' }}>
          {spacingSteps.map((step) => (
            <Labeled key={step} token={`--frontier-spacing-${step}`}>
              <div
                style={{
                  width: `var(--frontier-spacing-${step})`,
                  height: 'var(--frontier-spacing-3)',
                  background: 'var(--frontier-color-primary)',
                }}
              />
            </Labeled>
          ))}
        </div>
      </Section>
      <Section title="Radius">
        <div style={gridStyle}>
          {radii.map((radius) => (
            <Labeled key={radius} token={`--frontier-radius-${radius}`}>
              <div
                style={{
                  width: 'var(--frontier-spacing-16)',
                  height: 'var(--frontier-spacing-16)',
                  border: 'var(--frontier-border-width) solid var(--frontier-color-border-strong)',
                  borderRadius: `var(--frontier-radius-${radius})`,
                }}
              />
            </Labeled>
          ))}
        </div>
      </Section>
      <Section title="Shadows">
        <div style={gridStyle}>
          {shadows.map((shadow) => (
            <Labeled key={shadow} token={`--frontier-shadow-${shadow}`}>
              <div
                style={{
                  width: 'var(--frontier-spacing-16)',
                  height: 'var(--frontier-spacing-16)',
                  borderRadius: 'var(--frontier-radius-md)',
                  background: 'var(--frontier-color-surface-raised)',
                  boxShadow: `var(--frontier-shadow-${shadow})`,
                }}
              />
            </Labeled>
          ))}
        </div>
      </Section>
      <Section title="Blur">
        <div style={gridStyle}>
          {blurs.map((blur) => (
            <Labeled key={blur} token={`--frontier-blur-${blur}`}>
              <div
                style={{
                  position: 'relative',
                  width: 'var(--frontier-spacing-16)',
                  height: 'var(--frontier-spacing-16)',
                  overflow: 'hidden',
                  borderRadius: 'var(--frontier-radius-md)',
                  background:
                    'linear-gradient(90deg, var(--frontier-color-primary) 50%, var(--frontier-color-surface) 50%)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backdropFilter: `blur(var(--frontier-blur-${blur}))`,
                  }}
                />
              </div>
            </Labeled>
          ))}
        </div>
      </Section>
      <Section title="Controls">
        <div style={gridStyle}>
          {controls.map((control) => (
            <Labeled key={control} token={`--frontier-control-size-${control}`}>
              <div
                style={{
                  width: '8rem',
                  height: `var(--frontier-control-size-${control})`,
                  borderRadius: 'var(--frontier-radius-full)',
                  background: 'var(--frontier-color-secondary)',
                }}
              />
            </Labeled>
          ))}
        </div>
      </Section>
      <Section title="Motion">
        <div style={gridStyle}>
          {[
            ...durations.map((name) => `duration-${name}`),
            ...easings.map((name) => `easing-${name}`),
          ].map((name) => (
            <Labeled key={name} token={`--frontier-${name}`}>
              <span>{name}</span>
            </Labeled>
          ))}
        </div>
      </Section>
    </main>
  ),
}
