import { CursorCard } from '@rayscale/frontier'

const week = [
  { day: 'Mon', visits: 120 },
  { day: 'Tue', visits: 180 },
  { day: 'Wed', visits: 150 },
  { day: 'Thu', visits: 240 },
  { day: 'Fri', visits: 210 },
  { day: 'Sat', visits: 90 },
  { day: 'Sun', visits: 60 },
]

export default function Values() {
  return (
    <CursorCard followAxis="x">
      <CursorCard.Zone>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            height: '10rem',
            border: 'var(--frontier-border-width) dashed var(--frontier-color-border-strong)',
            borderRadius: 'var(--frontier-radius-lg)',
          }}
        >
          {week.map(({ day, visits }) => (
            <div
              key={day}
              aria-hidden="true"
              style={{
                width: '1.5rem',
                height: `${String(visits / 2.5)}%`,
                borderRadius: 'var(--frontier-radius-md)',
                background: 'var(--frontier-color-primary)',
              }}
            />
          ))}
        </div>
      </CursorCard.Zone>
      <CursorCard.Content side="top">
        {({ x, width }) => {
          const entry = week[Math.min(week.length - 1, Math.floor((x / width) * week.length))]

          return entry ? `${entry.day}: ${String(entry.visits)} visits` : null
        }}
      </CursorCard.Content>
    </CursorCard>
  )
}
