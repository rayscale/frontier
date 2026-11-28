import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Chart } from './index.js'

const data = [
  { day: 'Mon', visits: 120, goal: 100 },
  { day: 'Tue', visits: 180, goal: 140 },
  { day: 'Wed', visits: null, goal: 160 },
  { day: 'Thu', visits: 240, goal: 180 },
]

function renderChart(
  marks: React.ReactNode,
  props: Partial<Parameters<typeof Chart.Plot>[0]> = {},
  rootProps: Partial<Parameters<typeof Chart.Root>[0]> = {},
) {
  return render(
    <Chart.Root data={data} xKey="day" {...rootProps}>
      <Chart.Plot aria-label="Visits by day" width={400} height={200} {...props}>
        {marks}
      </Chart.Plot>
    </Chart.Root>,
  )
}

async function findCard(): Promise<HTMLElement> {
  return waitFor(() => {
    const card = document.querySelector<HTMLElement>('.frontier-cursor-card')

    if (!card) {
      throw new Error('Expected the cursor card to be open.')
    }

    return card
  })
}

describe('Chart', () => {
  it('draws an image named by the plot and offers the same data as a table', () => {
    const { container } = renderChart(<Chart.Bar dataKey="visits" />)

    expect(screen.getByRole('img', { name: 'Visits by day' })).toBeInTheDocument()

    const table = screen.getByRole('table', { name: 'Visits by day' })

    expect(
      within(table)
        .getAllByRole('columnheader')
        .map((cell) => cell.textContent),
    ).toEqual(['day', 'visits', 'goal'])
    expect(within(table).getByRole('row', { name: /Tue/ })).toHaveTextContent('Tue180140')
    expect(container.querySelector('.frontier-chart__table')).toHaveClass(
      'frontier-visually-hidden',
    )
  })

  it('names and orders the series from the config', () => {
    renderChart(
      <Chart.Bar dataKey="visits" />,
      {},
      {
        config: { goal: { label: 'Goal' }, visits: { label: 'Visits' } },
      },
    )

    const table = screen.getByRole('table')

    expect(
      within(table)
        .getAllByRole('columnheader')
        .map((cell) => cell.textContent),
    ).toEqual(['day', 'Goal', 'Visits'])
  })

  it('lists every series in the legend with its color', () => {
    const { container } = render(
      <Chart.Root
        data={data}
        xKey="day"
        config={{ visits: { label: 'Visits' }, goal: { label: 'Goal', color: 'red' } }}
      >
        <Chart.Legend />
      </Chart.Root>,
    )

    const items = container.querySelectorAll<HTMLElement>('.frontier-chart__legend-item')

    expect(Array.from(items).map((item) => item.textContent)).toEqual(['Visits', 'Goal'])
    expect(items[0]?.style.getPropertyValue('--_series-color')).toBe(
      'var(--frontier-color-chart-1)',
    )
    expect(items[1]?.style.getPropertyValue('--_series-color')).toBe('red')
  })

  it('draws a bar for each value and skips the rows without one', () => {
    const { container } = renderChart(<Chart.Bar dataKey="visits" />)

    expect(container.querySelectorAll('.frontier-chart__bar')).toHaveLength(3)
  })

  it('puts the bars of several series side by side', () => {
    const { container } = renderChart(
      <>
        <Chart.Bar dataKey="visits" />
        <Chart.Bar dataKey="goal" />
      </>,
    )

    expect(container.querySelectorAll('.frontier-chart__bar')).toHaveLength(7)
    expect(container.querySelectorAll('.frontier-chart__bars')).toHaveLength(2)
  })

  it('draws a line with a gap where a value is missing and marks points on request', () => {
    const { container } = renderChart(<Chart.Line dataKey="visits" curve="linear" dots />)

    const path = container.querySelector('.frontier-chart__line')

    expect(path?.getAttribute('d')?.match(/M/g)).toHaveLength(2)
    expect(container.querySelectorAll('.frontier-chart__dot')).toHaveLength(3)
  })

  it('draws an area with its line', () => {
    const { container } = renderChart(<Chart.Area dataKey="goal" />)

    expect(container.querySelector('.frontier-chart__area')?.getAttribute('d')).toMatch(/^M/)
    expect(container.querySelector('.frontier-chart__line')).toBeInTheDocument()
  })

  it('labels each position on the x axis and lets the label be formatted', () => {
    const { container } = renderChart(<Chart.XAxis tickFormat={(label) => label.toUpperCase()} />)

    expect(
      Array.from(container.querySelectorAll('.frontier-chart__axis--x text')).map(
        (text) => text.textContent,
      ),
    ).toEqual(['MON', 'TUE', 'WED', 'THU'])
  })

  it('skips x labels when there is no room for all of them', () => {
    const many = Array.from({ length: 12 }, (_, index) => ({
      day: `D${String(index)}`,
      visits: index,
    }))
    const { container } = render(
      <Chart.Root data={many} xKey="day">
        <Chart.Plot aria-label="Many" width={140} height={120}>
          <Chart.XAxis />
        </Chart.Plot>
      </Chart.Root>,
    )

    expect(container.querySelectorAll('.frontier-chart__axis--x text').length).toBeLessThan(12)
  })

  it('labels the value scale and lets the label be formatted', () => {
    const { container } = renderChart(<Chart.YAxis tickFormat={(value) => `${String(value)}k`} />)

    const labels = Array.from(container.querySelectorAll('.frontier-chart__axis--y text')).map(
      (text) => text.textContent,
    )

    expect(labels.length).toBeGreaterThan(1)
    expect(labels.every((label) => label.endsWith('k'))).toBe(true)
    expect(labels).toContain('0k')
  })

  it('follows a fixed value range', () => {
    const { container } = renderChart(<Chart.YAxis ticks={2} />, { yDomain: [0, 10] })

    const labels = Array.from(container.querySelectorAll('.frontier-chart__axis--y text')).map(
      (text) => text.textContent,
    )

    expect(labels).toEqual(['0', '5', '10'])
  })

  it('draws horizontal grid lines, and vertical ones on request', () => {
    const { container, rerender } = renderChart(<Chart.Grid />)

    const horizontal = container.querySelectorAll('.frontier-chart__grid line').length

    expect(horizontal).toBeGreaterThan(1)

    rerender(
      <Chart.Root data={data} xKey="day">
        <Chart.Plot aria-label="Visits by day" width={400} height={200}>
          <Chart.Grid vertical />
        </Chart.Plot>
      </Chart.Root>,
    )

    expect(container.querySelectorAll('.frontier-chart__grid line')).toHaveLength(horizontal + 4)
  })

  it('shows the row under the cursor in the tooltip and marks it on the plot', async () => {
    const user = userEvent.setup()
    const { container } = renderChart(
      <>
        <Chart.Bar dataKey="visits" />
        <Chart.Line dataKey="goal" />
        <Chart.Tooltip />
      </>,
      {},
      { config: { visits: { label: 'Visits' }, goal: { label: 'Goal' } } },
    )

    const zone = container.querySelector('.frontier-chart__zone')

    if (!zone) {
      throw new Error('Expected the tooltip zone to be drawn.')
    }

    await user.pointer({ target: zone, coords: { clientX: 100, clientY: 20 } })

    const card = within(await findCard())

    expect(card.getByText('Tue')).toBeInTheDocument()
    expect(card.getByText('Visits')).toBeInTheDocument()
    expect(card.getByText('180')).toBeInTheDocument()
    expect(card.getByText('140')).toBeInTheDocument()
    expect(container.querySelector('.frontier-chart__cursor')).toBeInTheDocument()
    expect(container.querySelector('.frontier-chart__active-dot')).toBeInTheDocument()

    await user.unhover(zone)

    expect(container.querySelector('.frontier-chart__cursor')).not.toBeInTheDocument()
  })

  it('shows a dash for a series with no value and formats the others', async () => {
    const user = userEvent.setup()
    const { container } = renderChart(
      <Chart.Tooltip valueFormat={(value, key) => `${key}:${String(value)}`} />,
      {},
      { config: { visits: { label: 'Visits' } } },
    )

    const zone = container.querySelector('.frontier-chart__zone')

    if (!zone) {
      throw new Error('Expected the tooltip zone to be drawn.')
    }

    await user.pointer({ target: zone, coords: { clientX: 200, clientY: 20 } })

    const card = within(await findCard())

    expect(card.getByText('Wed')).toBeInTheDocument()
    expect(card.getByText('—')).toBeInTheDocument()
  })

  it('lets the tooltip content be replaced', async () => {
    const user = userEvent.setup()
    const { container } = renderChart(
      <Chart.Tooltip>{({ label, index }) => `Row ${String(index)}: ${label}`}</Chart.Tooltip>,
    )

    const zone = container.querySelector('.frontier-chart__zone')

    if (!zone) {
      throw new Error('Expected the tooltip zone to be drawn.')
    }

    await user.pointer({ target: zone, coords: { clientX: 300, clientY: 20 } })

    expect(within(await findCard()).getByText('Row 3: Thu')).toBeInTheDocument()
  })

  it('renders without data', () => {
    const { container } = render(
      <Chart.Root data={[]} xKey="day">
        <Chart.Plot aria-label="Empty" width={400} height={200}>
          <Chart.Grid />
          <Chart.XAxis />
          <Chart.YAxis />
          <Chart.Bar dataKey="visits" />
          <Chart.Line dataKey="visits" />
          <Chart.Area dataKey="visits" />
        </Chart.Plot>
      </Chart.Root>,
    )

    expect(screen.getByRole('img', { name: 'Empty' })).toBeInTheDocument()
    expect(container.querySelectorAll('.frontier-chart__bar')).toHaveLength(0)
  })

  it('forwards refs and native attributes to the root and the plot', () => {
    const rootRef = createRef<HTMLDivElement>()
    const plotRef = createRef<HTMLDivElement>()
    render(
      <Chart.Root ref={rootRef} data={data} xKey="day" className="custom" data-testid="root">
        <Chart.Plot ref={plotRef} aria-label="Visits" width={400} data-testid="plot" />
      </Chart.Root>,
    )

    expect(rootRef.current).toBe(screen.getByTestId('root'))
    expect(rootRef.current).toHaveClass('frontier-chart', 'custom')
    expect(plotRef.current).toBe(screen.getByTestId('plot'))
  })

  it('requires its parts to be inside the right parent', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => render(<Chart.Plot aria-label="x" />)).toThrow('inside Chart.Root')
    expect(() =>
      render(
        <Chart.Root data={data} xKey="day">
          <Chart.Grid />
        </Chart.Root>,
      ),
    ).toThrow('inside Chart.Plot')

    vi.restoreAllMocks()
  })
})
