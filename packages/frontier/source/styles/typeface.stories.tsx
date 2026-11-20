import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties, ReactElement } from 'react'

const meta = {
  title: 'Foundations/Typeface',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Geist is the typeface of the system. The system font is the fallback while it loads.',
      },
    },
  },
} satisfies Meta

export default meta

type TStory = StoryObj<typeof meta>

interface TFeature {
  label: string
  tag: string
  sample: string
  settings: string
}

const sizes = ['3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs'] as const

const weights = [
  { label: 'Light', value: 300 },
  { label: 'Regular', value: 400 },
  { label: 'Medium', value: 500 },
  { label: 'Semibold', value: 600 },
  { label: 'Bold', value: 700 },
] as const

const features: TFeature[] = [
  { label: 'Tabular figures', tag: 'tnum', sample: '1111 8888 0000', settings: "'tnum'" },
  { label: 'Proportional figures', tag: 'pnum', sample: '1111 8888 0000', settings: "'pnum'" },
  { label: 'Slashed zero', tag: 'zero', sample: '2026 100 0', settings: "'zero'" },
  { label: 'Case-sensitive forms', tag: 'case', sample: 'HELLO-WORLD (A+B)', settings: "'case'" },
]

const ranges: [number, number][] = [
  [0x21, 0x7e],
  [0xa1, 0xff],
  [0x100, 0x17f],
]

const glyphs = ranges.flatMap(([start, end]) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index)
    .filter((code) => code !== 0xad)
    .map((code) => String.fromCodePoint(code)),
)

const mainStyle: CSSProperties = {
  boxSizing: 'border-box',
  display: 'grid',
  gap: 'var(--frontier-spacing-10)',
  width: 'min(64rem, 100%)',
  maxHeight: 'calc(100vh - var(--frontier-spacing-16))',
  padding: 'var(--frontier-spacing-8)',
  overflow: 'auto',
  background: 'var(--frontier-color-background)',
  color: 'var(--frontier-color-text)',
  fontFamily: 'var(--frontier-font-family)',
}

const captionStyle: CSSProperties = {
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

export const Specimen: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows the type scale and the variable weight axis, from Light to Bold, in the active mode.',
      },
    },
  },
  render: () => (
    <main style={mainStyle}>
      <Section title="Scale">
        <div style={{ display: 'grid', gap: 'var(--frontier-spacing-3)' }}>
          {sizes.map((size) => (
            <div key={size} style={{ display: 'grid', gap: 'var(--frontier-spacing-1)' }}>
              <span style={{ fontSize: `var(--frontier-font-size-${size})` }}>
                The quick brown fox jumps over the lazy dog
              </span>
              <span style={captionStyle}>--frontier-font-size-{size}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Weights">
        <div style={{ display: 'grid', gap: 'var(--frontier-spacing-3)' }}>
          {weights.map((weight) => (
            <div key={weight.value} style={{ display: 'grid', gap: 'var(--frontier-spacing-1)' }}>
              <span
                style={{
                  fontSize: 'var(--frontier-font-size-2xl)',
                  fontWeight: weight.value,
                }}
              >
                Frontier is a design language for the web
              </span>
              <span style={captionStyle}>
                {weight.label} {weight.value}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </main>
  ),
}

export const Features: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows the OpenType features of Geist: figure widths, slashed zero, and case-sensitive punctuation.',
      },
    },
  },
  render: () => (
    <main style={mainStyle}>
      <Section title="OpenType features">
        <div style={{ display: 'grid', gap: 'var(--frontier-spacing-4)' }}>
          {features.map((feature) => (
            <div key={feature.tag} style={{ display: 'grid', gap: 'var(--frontier-spacing-1)' }}>
              <span
                style={{
                  fontSize: 'var(--frontier-font-size-2xl)',
                  fontFeatureSettings: feature.settings,
                }}
              >
                {feature.sample}
              </span>
              <span style={captionStyle}>
                {feature.label} ({feature.tag})
              </span>
            </div>
          ))}
        </div>
      </Section>
    </main>
  ),
}

export const Glyphs: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Shows the characters of Geist: Basic Latin, Latin-1, and Latin Extended-A.',
      },
    },
  },
  render: () => (
    <main style={mainStyle}>
      <Section title="Characters">
        <div
          style={{
            display: 'grid',
            gap: 'var(--frontier-spacing-1)',
            gridTemplateColumns: 'repeat(auto-fill, minmax(3rem, 1fr))',
          }}
        >
          {glyphs.map((glyph) => (
            <span
              key={glyph}
              style={{
                display: 'grid',
                aspectRatio: '1',
                placeItems: 'center',
                border: 'var(--frontier-border-width-subtle) solid var(--frontier-color-border)',
                borderRadius: 'var(--frontier-radius-sm)',
                fontSize: 'var(--frontier-font-size-2xl)',
              }}
            >
              {glyph}
            </span>
          ))}
        </div>
      </Section>
    </main>
  ),
}
