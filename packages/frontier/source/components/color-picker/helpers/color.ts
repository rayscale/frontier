import {
  converter,
  formatCss,
  formatHex,
  formatHex8,
  formatHsl,
  formatRgb,
  type Hsv,
  parse,
} from 'culori'

import type { TColorChannel, TColorFormat, TColorHsba } from '../types.js'

const toHsv = converter('hsv')
const toRgb = converter('rgb')
const toOklch = converter('oklch')

export const defaultColor: TColorHsba = { hue: 0, saturation: 0, brightness: 0, alpha: 1 }

interface TChannelRange {
  readonly max: number
  readonly min: number
  readonly step: number
}

const channelRanges: { readonly [channel in TColorChannel]: TChannelRange } = {
  hue: { min: 0, max: 360, step: 1 },
  saturation: { min: 0, max: 100, step: 1 },
  brightness: { min: 0, max: 100, step: 1 },
  alpha: { min: 0, max: 100, step: 1 },
  red: { min: 0, max: 255, step: 1 },
  green: { min: 0, max: 255, step: 1 },
  blue: { min: 0, max: 255, step: 1 },
}

const channelLabels: { readonly [channel in TColorChannel]: string } = {
  hue: 'Hue',
  saturation: 'Saturation',
  brightness: 'Brightness',
  alpha: 'Alpha',
  red: 'Red',
  green: 'Green',
  blue: 'Blue',
}

export function getChannelLabel(channel: TColorChannel): string {
  return channelLabels[channel]
}

export function getChannelRange(channel: TColorChannel): TChannelRange {
  return channelRanges[channel]
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function toColor(color: TColorHsba): Hsv {
  return {
    mode: 'hsv',
    h: color.hue,
    s: color.saturation / 100,
    v: color.brightness / 100,
    alpha: color.alpha,
  }
}

/** Reads any CSS color string. Returns `null` when the text is not a color. */
export function parseColor(value: string): TColorHsba | null {
  const parsed = parse(value.trim())
  if (!parsed) {
    return null
  }

  const hsv = toHsv(parsed)

  return {
    hue: hsv.h ?? 0,
    saturation: clamp(hsv.s * 100, 0, 100),
    brightness: clamp(hsv.v * 100, 0, 100),
    alpha: clamp(hsv.alpha ?? 1, 0, 1),
  }
}

/** Writes a color in the chosen format, leaving out the alpha when it is opaque or not in use. */
export function formatColor(color: TColorHsba, format: TColorFormat, alpha: boolean): string {
  const source = toColor(alpha ? color : { ...color, alpha: 1 })
  const opaque = source.alpha === undefined || source.alpha >= 1
  const formatters: { readonly [name in TColorFormat]: () => string } = {
    hex: () => (opaque ? formatHex(source) : formatHex8(source)),
    rgb: () => formatRgb(source),
    hsl: () => formatHsl(source),
    oklch: () => formatCss(toOklch(source)),
  }

  return formatters[format]()
}

/** Compares two colors by what they look like, so `#fff` and `rgb(255 255 255)` match. */
export function isSameColor(first: string, second: string): boolean {
  const firstColor = parse(first.trim())
  const secondColor = parse(second.trim())
  if (!firstColor || !secondColor) {
    return false
  }

  return formatHex8(firstColor) === formatHex8(secondColor)
}

/** The color as a CSS string that every browser reads, for backgrounds. */
export function toCssColor(color: TColorHsba): string {
  return formatHex8(toColor(color))
}

export function getChannelValue(color: TColorHsba, channel: TColorChannel): number {
  const rgb = toRgb(toColor(color))
  const values: { readonly [name in TColorChannel]: number } = {
    hue: color.hue,
    saturation: color.saturation,
    brightness: color.brightness,
    alpha: color.alpha * 100,
    red: rgb.r * 255,
    green: rgb.g * 255,
    blue: rgb.b * 255,
  }

  return values[channel]
}

/** Returns the color with one channel changed, keeping the hue when the color has none. */
export function setChannelValue(
  color: TColorHsba,
  channel: TColorChannel,
  input: number,
): TColorHsba {
  const { min, max } = channelRanges[channel]
  const value = clamp(input, min, max)

  if (channel === 'red' || channel === 'green' || channel === 'blue') {
    const rgb = toRgb(toColor(color))
    const hsv = toHsv({
      ...rgb,
      r: channel === 'red' ? value / 255 : rgb.r,
      g: channel === 'green' ? value / 255 : rgb.g,
      b: channel === 'blue' ? value / 255 : rgb.b,
    })

    return {
      hue: hsv.h ?? color.hue,
      saturation: clamp(hsv.s * 100, 0, 100),
      brightness: clamp(hsv.v * 100, 0, 100),
      alpha: color.alpha,
    }
  }

  if (channel === 'alpha') {
    return { ...color, alpha: value / 100 }
  }

  return { ...color, [channel]: value }
}

function rainbowStops(color: TColorHsba): string {
  return [0, 60, 120, 180, 240, 300, 360]
    .map((hue) => `${toCssColor({ ...color, hue, alpha: 1 })} ${String((hue / 360) * 100)}%`)
    .join(', ')
}

/** The ring of a color wheel: every hue at full saturation and brightness, clockwise from the top. */
export function getWheelGradient(): string {
  return `conic-gradient(from 0deg, ${rainbowStops({ hue: 0, saturation: 100, brightness: 100, alpha: 1 })})`
}

/** The track gradient of a channel slider: the channel running from its lowest to its highest value. */
export function getChannelGradient(
  color: TColorHsba,
  channel: TColorChannel,
  direction: 'right' | 'top',
): string {
  if (channel === 'hue') {
    return `linear-gradient(to ${direction}, ${rainbowStops(color)})`
  }

  const { min, max } = channelRanges[channel]
  const opaque = { ...color, alpha: channel === 'alpha' ? 1 : color.alpha }
  const start = toCssColor(setChannelValue(opaque, channel, min))
  const end = toCssColor(setChannelValue(opaque, channel, max))

  const first = channel === 'alpha' ? toCssColor({ ...color, alpha: 0 }) : start

  return `linear-gradient(to ${direction}, ${first}, ${end})`
}

/** Moves a point on a wheel to a hue, measured clockwise from the top. */
export function getHueFromPoint(x: number, y: number, centerX: number, centerY: number): number {
  const degrees = (Math.atan2(x - centerX, centerY - y) * 180) / Math.PI

  return (degrees + 360) % 360
}

/**
 * Moves a turning angle to a new hue by the shortest way around, so a hue that goes from 350 to
 * 10 turns 20 degrees forward instead of 340 degrees back.
 */
export function getShortestTurn(turn: number, hue: number): number {
  const difference = hue - (((turn % 360) + 360) % 360)

  return turn + ((((difference + 540) % 360) + 360) % 360) - 180
}
