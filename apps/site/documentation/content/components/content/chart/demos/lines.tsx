import { Chart } from '@rayscale/frontier'

const data = [
  { month: 'Jan', revenue: 4200, costs: 3100 },
  { month: 'Feb', revenue: 3800, costs: 3300 },
  { month: 'Mar', revenue: 5100, costs: 3600 },
  { month: 'Apr', revenue: 4700, costs: 3900 },
  { month: 'May', revenue: 5900, costs: 4100 },
  { month: 'Jun', revenue: 6400, costs: 4300 },
  { month: 'Jul', revenue: 6100, costs: 4600 },
  { month: 'Aug', revenue: 7200, costs: 4800 },
  { month: 'Sep', revenue: 6800, costs: 5000 },
  { month: 'Oct', revenue: 7600, costs: 5200 },
  { month: 'Nov', revenue: 8100, costs: 5400 },
  { month: 'Dec', revenue: 9300, costs: 5900 },
]

const thousands = (value: number) => `$${String(value / 1000)}k`
const money = (value: number) => `$${value.toLocaleString()}`

export default function Lines() {
  return (
    <Chart.Root
      data={data}
      xKey="month"
      config={{ revenue: { label: 'Revenue' }, costs: { label: 'Costs' } }}
    >
      <Chart.Legend />
      <Chart.Plot aria-label="Revenue and costs by month">
        <Chart.Grid />
        <Chart.XAxis />
        <Chart.YAxis tickFormat={thousands} />
        <Chart.Line dataKey="revenue" dots />
        <Chart.Line dataKey="costs" dots />
        <Chart.Tooltip valueFormat={money} />
      </Chart.Plot>
    </Chart.Root>
  )
}
