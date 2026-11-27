import type { TChartSeries } from '../context.js'
import type { TChartConfig, TChartDatum } from '../types.js'

const paletteSize = 6

/** The number a datum holds for a key, or `null` when it holds none. */
export function readValue(datum: TChartDatum, key: string): number | null {
  const value = datum[key]

  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

/** The fields that hold numbers in at least one row, apart from the x key. */
function inferKeys(data: readonly TChartDatum[], xKey: string): string[] {
  const keys = new Set<string>()

  for (const datum of data) {
    for (const key of Object.keys(datum)) {
      if (key !== xKey && readValue(datum, key) !== null) {
        keys.add(key)
      }
    }
  }

  return Array.from(keys)
}

/** Names and colors each series, in the order of the config, or of the data without one. */
export function resolveSeries(
  data: readonly TChartDatum[],
  xKey: string,
  config: TChartConfig | undefined,
): TChartSeries[] {
  const keys = config ? Object.keys(config) : inferKeys(data, xKey)

  return keys.map((key, index) => ({
    color:
      config?.[key]?.color ?? `var(--frontier-color-chart-${String((index % paletteSize) + 1)})`,
    key,
    label: config?.[key]?.label ?? key,
  }))
}

/** The text that names the position of a row along the x axis. */
export function readLabel(datum: TChartDatum, xKey: string): string {
  const value = datum[xKey]

  return value === null || value === undefined ? '' : String(value)
}
