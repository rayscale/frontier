import { Chart } from '@rayscale/frontier'

const data = [
  { day: 'Mon', visits: 120, signups: 24 },
  { day: 'Tue', visits: 180, signups: 38 },
  { day: 'Wed', visits: 150, signups: 30 },
  { day: 'Thu', visits: 240, signups: 52 },
  { day: 'Fri', visits: 210, signups: 47 },
  { day: 'Sat', visits: 90, signups: 14 },
  { day: 'Sun', visits: 60, signups: 9 },
]

export default function CustomTooltip() {
  return (
    <Chart.Root data={data} xKey="day" config={{ visits: { label: 'Visits' } }}>
      <Chart.Plot aria-label="Visits by day of the week">
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Bar dataKey="visits" />
        <Chart.Tooltip>
          {({ datum, label }) => (
            <div style={{ display: 'grid', gap: '0.125rem' }}>
              <strong>{label}</strong>
              <span>
                {String(datum.visits)} visits, {String(datum.signups)} sign-ups
              </span>
            </div>
          )}
        </Chart.Tooltip>
      </Chart.Plot>
    </Chart.Root>
  )
}
