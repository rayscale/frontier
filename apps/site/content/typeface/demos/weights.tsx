const weights = [
  { name: 'Light', value: 300 },
  { name: 'Regular', value: 400 },
  { name: 'Medium', value: 500 },
  { name: 'SemiBold', value: 600 },
  { name: 'Bold', value: 700 },
]

export default function Weights() {
  return (
    <div style={{ display: 'grid', gap: '0.5rem', inlineSize: '100%' }}>
      {weights.map((weight) => (
        <p
          key={weight.value}
          style={{
            margin: 0,
            fontFamily: 'var(--frontier-font-family)',
            fontSize: '1.5rem',
            fontWeight: weight.value,
          }}
        >
          {weight.name} {weight.value} · Frontier is a design language for the web
        </p>
      ))}
    </div>
  )
}
