import { Chart } from '@rayscale/frontier'

const data = [
  { day: 'Mon', visits: 120 },
  { day: 'Tue', visits: 180 },
  { day: 'Wed', visits: 150 },
  { day: 'Thu', visits: 240 },
  { day: 'Fri', visits: 210 },
  { day: 'Sat', visits: 90 },
  { day: 'Sun', visits: 60 },
]

export default function Bars() {
  return (
    <Chart.Root data={data} xKey="day" config={{ visits: { label: 'Visits' } }}>
      <Chart.Legend />
      <Chart.Plot aria-label="Visits by day of the week">
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Bar dataKey="visits" />
        <Chart.Tooltip />
      </Chart.Plot>
    </Chart.Root>
  )
}
