const features = [
  { label: 'Tabular figures (tnum)', sample: '1111 8888 0000', settings: "'tnum'" },
  { label: 'Proportional figures (pnum)', sample: '1111 8888 0000', settings: "'pnum'" },
  { label: 'Slashed zero (zero)', sample: '2026 100 0', settings: "'zero'" },
  { label: 'Single-storey a (ss01)', sample: 'banana Anna', settings: "'ss01'" },
  { label: 'Case-sensitive forms (case)', sample: 'HELLO-WORLD (A+B)', settings: "'case'" },
]

export default function Features() {
  return (
    <div style={{ display: 'grid', gap: '1rem', inlineSize: '100%' }}>
      {features.map((feature) => (
        <div key={feature.label}>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--frontier-font-family)',
              fontFeatureSettings: feature.settings,
              fontSize: '1.5rem',
            }}
          >
            {feature.sample}
          </p>
          <small style={{ color: 'var(--frontier-color-text-muted)' }}>{feature.label}</small>
        </div>
      ))}
    </div>
  )
}
