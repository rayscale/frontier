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

const thousands = (value: number) => `$${String(value / 1000)}k`
const money = (value: number) => `$${value.toLocaleString()}`

export default function Areas() {
  return (
    <Chart.Root data={data} xKey="month" config={{ revenue: { label: 'Revenue' } }}>
      <Chart.Plot aria-label="Revenue by month">
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis tickFormat={thousands} />
        <Chart.Area dataKey="revenue" />
        <Chart.Tooltip valueFormat={money} />
      </Chart.Plot>
    </Chart.Root>
  )
}
