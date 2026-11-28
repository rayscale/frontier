import { Chart } from '@rayscale/frontier'

const data = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 3800 },
  { month: 'Mar', revenue: 5100 },
  { month: 'Apr', revenue: 4700 },
  { month: 'May', revenue: 5900 },
  { month: 'Jun', revenue: 6400 },
  { month: 'Jul', revenue: 6100 },
  { month: 'Aug', revenue: 7200 },
  { month: 'Sep', revenue: 6800 },
  { month: 'Oct', revenue: 7600 },
  { month: 'Nov', revenue: 8100 },
  { month: 'Dec', revenue: 9300 },
]

export default function Sparkline() {
  return (
    <div style={{ width: '12rem' }}>
      <Chart.Root data={data} xKey="month" config={{ revenue: { label: 'Revenue' } }}>
        <Chart.Plot
          aria-label="Revenue trend for the year"
          height={48}
          margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
        >
          <Chart.Line dataKey="revenue" />
          <Chart.Tooltip />
        </Chart.Plot>
      </Chart.Root>
    </div>
  )
}
