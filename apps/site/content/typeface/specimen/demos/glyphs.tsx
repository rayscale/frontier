const sets = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '0123456789',
  '.,:;!?¡¿&@#%()[]{}/-–—+=*"\'«»',
  'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝ',
  'àáâãäåçèéêëìíîïñòóôõöøùúûüýÿ',
  'ĀĂĄĆČĎĐĒĘĚĞĪŁŃŇŌŐŒŘŚŠŞŤŪŮŰŹŻŽ',
]

export default function Glyphs() {
  return (
    <div style={{ display: 'grid', gap: '0.75rem', inlineSize: '100%' }}>
      {sets.map((set) => (
        <p
          key={set}
          style={{
            margin: 0,
            fontFamily: 'var(--frontier-font-family)',
            fontSize: '1.5rem',
            overflowWrap: 'anywhere',
          }}
        >
          {set}
        </p>
      ))}
    </div>
  )
}
