import { Chart } from '@rayscale/frontier'

const data = [
  { day: 'Mon', visits: 120, goal: 100 },
  { day: 'Tue', visits: 180, goal: 140 },
  { day: 'Wed', visits: 150, goal: 160 },
  { day: 'Thu', visits: 240, goal: 180 },
  { day: 'Fri', visits: 210, goal: 200 },
  { day: 'Sat', visits: 90, goal: 120 },
  { day: 'Sun', visits: 60, goal: 100 },
]

export default function Mixed() {
  return (
    <Chart.Root
      data={data}
      xKey="day"
      config={{ visits: { label: 'Visits' }, goal: { label: 'Goal' } }}
    >
      <Chart.Legend />
      <Chart.Plot aria-label="Visits against the goal by day of the week">
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis />
        <Chart.Bar dataKey="visits" />
        <Chart.Line dataKey="goal" curve="step" />
        <Chart.Tooltip />
      </Chart.Plot>
    </Chart.Root>
  )
}
