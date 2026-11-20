const sizes = ['3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs']

export default function Scale() {
  return (
    <div style={{ display: 'grid', gap: '0.75rem', inlineSize: '100%' }}>
      {sizes.map((size) => (
        <p
          key={size}
          style={{
            margin: 0,
            fontFamily: 'var(--frontier-font-family)',
            fontSize: `var(--frontier-font-size-${size})`,
          }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
      ))}
    </div>
  )
}
