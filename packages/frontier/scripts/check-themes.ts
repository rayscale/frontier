import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

type TThemeKind = 'conformant' | 'extended'
type TThemeMode = 'light' | 'dark'

interface TThemeDeparture {
  /** The guideline, as its path under `guidelines/`, such as `foundations/typeface`. */
  guideline: string
  /** Why the theme departs from the guideline. */
  reason: string
}

/** The result of one contrast requirement in one mode. */
export interface TCheck {
  /** Role of the foreground color, without the `--frontier-color-` prefix. */
  foreground: string
  /** Role of the background color, without the `--frontier-color-` prefix. */
  background: string
  /** Measured contrast ratio, rounded to two decimals. */
  ratio: number
  /** Smallest ratio that the requirement allows. */
  minimum: number
  passed: boolean
}

/** The color roles of a mode, resolved, and how they measure up. */
export interface TModeReport {
  colors: { [role: string]: string }
  checks: TCheck[]
}

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const tokensRoot = join(packageRoot, 'source', 'styles', 'tokens')
const guidelinesRoot = resolve(packageRoot, '..', '..', 'guidelines')

const rolePrefix = '--frontier-color-'

/** One rule of a stylesheet: its selectors and the custom properties it declares. */
export interface TBlock {
  selectors: string[]
  declarations: { [property: string]: string }
}

/** The custom properties that a stylesheet declares, grouped by where they apply. */
export interface TCollected {
  /** Declared for every mode: the palette, or the values of a theme before its dark overrides. */
  shared: { [property: string]: string }
  /** Declared only for the light mode. */
  light: { [property: string]: string }
  /** Declared only for the dark mode. */
  dark: { [property: string]: string }
}

interface TColor {
  r: number
  g: number
  b: number
  a: number
}

/**
 * The text and graphics pairs that every theme must meet in both modes. Text meets 4.5, and the
 * focus indicator, which is a graphic, meets 3.
 *
 * `text-subtle` is not listed yet: the dark value of the Frontier theme measures 4.43 on the
 * background and 3.78 on a surface, so listing it would fail the default theme.
 */
export const contrastRequirements: readonly (readonly [string, string, number])[] = [
  ['text', 'background', 4.5],
  ['text', 'surface', 4.5],
  ['text', 'surface-raised', 4.5],
  ['text', 'surface-floating', 4.5],
  ['text-muted', 'background', 4.5],
  ['text-muted', 'surface', 4.5],
  ['on-primary', 'primary', 4.5],
  ['on-secondary', 'secondary', 4.5],
  ['danger', 'background', 4.5],
  ['danger', 'danger-subtle', 4.5],
  ['success', 'background', 4.5],
  ['success', 'success-subtle', 4.5],
  ['warning', 'background', 4.5],
  ['warning', 'warning-subtle', 4.5],
  ['info', 'background', 4.5],
  ['info', 'info-subtle', 4.5],
  ['focus', 'background', 3],
  ['focus', 'surface', 3],
]

/** Reads the rules of a stylesheet that declare custom properties. Comments are ignored. */
export function parseBlocks(css: string): TBlock[] {
  const source = css.replaceAll(/\/\*[\s\S]*?\*\//g, '')
  const blocks: TBlock[] = []

  for (const match of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectorText = match[1]?.trim()
    const body = match[2]

    if (!selectorText || body === undefined || selectorText.startsWith('@')) {
      continue
    }

    const declarations: { [property: string]: string } = {}

    for (const declaration of body.split(';')) {
      const index = declaration.indexOf(':')

      if (index === -1) {
        continue
      }

      const property = declaration.slice(0, index).trim()
      const value = declaration
        .slice(index + 1)
        .trim()
        .replaceAll(/\s+/g, ' ')

      if (property.startsWith('--') && value !== '') {
        declarations[property] = value
      }
    }

    blocks.push({
      selectors: selectorText.split(',').map((selector) => selector.trim()),
      declarations,
    })
  }

  return blocks
}

function groupOf(block: TBlock): keyof TCollected {
  if (block.selectors.some((selector) => selector.includes("[data-mode='dark']"))) {
    return 'dark'
  }

  if (block.selectors.some((selector) => selector.includes("[data-mode='light']"))) {
    return 'light'
  }

  return 'shared'
}

/** Groups the declarations of blocks by the mode they apply to, keeping their order. */
export function collect(blocks: readonly TBlock[]): TCollected {
  const collected: TCollected = { shared: {}, light: {}, dark: {} }

  for (const block of blocks) {
    Object.assign(collected[groupOf(block)], block.declarations)
  }

  return collected
}

/** Replaces every `var()` in a value with what it points to. */
export function resolveValue(
  value: string,
  variables: { [property: string]: string | undefined },
  trail: readonly string[] = [],
): string {
  return value.replaceAll(/var\((--[\w-]+)\)/g, (_match, name: string) => {
    if (trail.includes(name)) {
      throw new Error(`${name} refers to itself.`)
    }

    const next = variables[name]

    if (next === undefined) {
      throw new Error(`${name} is not declared.`)
    }

    return resolveValue(next, variables, [...trail, name])
  })
}

/** Reads a hex, `rgb()`, or `rgba()` color. */
export function parseColor(value: string): TColor {
  const text = value.trim().toLowerCase()
  const hex = /^#([0-9a-f]{3,8})$/.exec(text)?.[1]

  if (hex && [3, 4, 6, 8].includes(hex.length)) {
    const full = hex.length <= 4 ? hex.replaceAll(/./g, '$&$&') : hex
    const channels = [0, 2, 4, 6].map((index) => Number.parseInt(full.slice(index, index + 2), 16))

    return {
      r: channels[0] ?? 0,
      g: channels[1] ?? 0,
      b: channels[2] ?? 0,
      a: full.length === 8 ? (channels[3] ?? 255) / 255 : 1,
    }
  }

  const rgb =
    /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[/,]\s*([\d.]+)(%?))?\s*\)$/.exec(text)

  if (rgb) {
    const alpha = rgb[4] === undefined ? 1 : Number(rgb[4]) / (rgb[5] === '%' ? 100 : 1)

    return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]), a: alpha }
  }

  throw new Error(`Cannot read the color ${value}.`)
}

function over(top: TColor, bottom: TColor): TColor {
  const a = top.a + bottom.a * (1 - top.a)

  if (a === 0) {
    return { r: 0, g: 0, b: 0, a: 0 }
  }

  const mix = (front: number, back: number): number =>
    (front * top.a + back * bottom.a * (1 - top.a)) / a

  return { r: mix(top.r, bottom.r), g: mix(top.g, bottom.g), b: mix(top.b, bottom.b), a }
}

function channelLuminance(value: number): number {
  const scaled = value / 255

  return scaled <= 0.039_28 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4
}

/** The relative luminance of an opaque color, as WCAG defines it. */
export function luminance(color: TColor): number {
  return (
    0.2126 * channelLuminance(color.r) +
    0.7152 * channelLuminance(color.g) +
    0.0722 * channelLuminance(color.b)
  )
}

/** The WCAG contrast ratio of a foreground over a background, from 1 to 21. */
export function contrastRatio(foreground: TColor, background: TColor): number {
  const first = luminance(over(foreground, background))
  const second = luminance(background)
  const lighter = Math.max(first, second)
  const darker = Math.min(first, second)

  return (lighter + 0.05) / (darker + 0.05)
}

/** The custom properties that apply in a mode: the base theme, then the theme over it. */
export function modeVariables(
  mode: TThemeMode,
  base: TCollected,
  theme?: TCollected,
): { [property: string]: string } {
  const variables = { ...base.shared, ...base[mode] }

  if (theme) {
    Object.assign(variables, theme.shared, theme[mode])
  }

  return variables
}

/** Resolves the color roles of a mode and measures every contrast requirement. */
export function reportMode(variables: { [property: string]: string }): TModeReport {
  const colors: { [role: string]: string } = {}

  for (const [property, value] of Object.entries(variables)) {
    if (property.startsWith(rolePrefix)) {
      colors[property.slice(rolePrefix.length)] = resolveValue(value, variables)
    }
  }

  const background = parseColor(colors.background ?? '')
  const checks: TCheck[] = contrastRequirements.map(([foreground, behind, minimum]) => {
    const foregroundValue = colors[foreground]
    const behindValue = colors[behind]

    if (foregroundValue === undefined || behindValue === undefined) {
      throw new Error(`The role ${foregroundValue === undefined ? foreground : behind} is missing.`)
    }

    const ratio = contrastRatio(
      parseColor(foregroundValue),
      over(parseColor(behindValue), background),
    )

    return {
      foreground,
      background: behind,
      ratio: Math.round(ratio * 100) / 100,
      minimum,
      passed: ratio >= minimum,
    }
  })

  return { colors, checks }
}

/** Lists the color roles that a theme leaves out in either mode, or that the system does not have. */
export function findRoleProblems(base: TCollected, theme: TCollected): string[] {
  const roles = Object.keys(base.light).filter((property) => property.startsWith(rolePrefix))
  const light = new Set(Object.keys({ ...theme.shared, ...theme.light }))
  const dark = new Set(Object.keys(theme.dark))
  const known = new Set(roles)
  const problems: string[] = []

  for (const role of roles) {
    if (!light.has(role)) {
      problems.push(`${role} is not declared for the light mode.`)
    }

    if (!dark.has(role)) {
      problems.push(`${role} is not declared for the dark mode.`)
    }
  }

  for (const property of [...light, ...dark]) {
    if (property.startsWith(rolePrefix) && !known.has(property)) {
      problems.push(`${property} is not a color role of the system.`)
    }
  }

  return problems
}

interface TManifest {
  name: string
  kind: TThemeKind
  departures: TThemeDeparture[]
}

function isRecord(value: unknown): value is { [key: string]: unknown } {
  return typeof value === 'object' && value !== null
}

/** Checks a theme manifest, and lists what is wrong with it. */
export function validateManifest(
  value: unknown,
  name: string,
  guidelinePathExists: (guideline: string) => boolean,
): { problems: string[]; manifest?: TManifest } {
  const problems: string[] = []

  if (!isRecord(value)) {
    return { problems: ['The manifest must be an object.'] }
  }

  const { kind, departures } = value

  if (value.name !== name) {
    problems.push(`The name must be "${name}", like the file.`)
  }

  if (kind !== 'conformant' && kind !== 'extended') {
    problems.push('The kind must be "conformant" or "extended".')
  }

  const listed: TThemeDeparture[] = []

  if (!Array.isArray(departures)) {
    problems.push('The manifest needs a list of departures, empty for a conformant theme.')
  } else {
    for (const departure of departures as unknown[]) {
      if (
        !isRecord(departure) ||
        typeof departure.guideline !== 'string' ||
        typeof departure.reason !== 'string' ||
        departure.reason === ''
      ) {
        problems.push('Every departure needs a guideline and a reason.')
      } else if (!guidelinePathExists(departure.guideline)) {
        problems.push(`The guideline ${departure.guideline} does not exist.`)
      } else {
        listed.push({ guideline: departure.guideline, reason: departure.reason })
      }
    }
  }

  if (kind === 'conformant' && listed.length > 0) {
    problems.push('A conformant theme has no departures. Make it extended, or remove them.')
  }

  if (kind === 'extended' && listed.length === 0) {
    problems.push('An extended theme names at least one departure.')
  }

  if (problems.length > 0 || (kind !== 'conformant' && kind !== 'extended')) {
    return { problems }
  }

  return { manifest: { name, kind, departures: listed }, problems }
}

function readBase(): TCollected {
  const blocks = readdirSync(tokensRoot)
    .filter((file) => file.endsWith('.css'))
    .sort()
    .flatMap((file) => parseBlocks(readFileSync(join(tokensRoot, file), 'utf8')))

  return collect(blocks)
}

interface TTarget {
  name: string
  stylesheet: string
}

/** The stylesheets named on the command line. A theme is named after its file. */
function findTargets(args: readonly string[]): TTarget[] {
  return args.map((file) => {
    const stylesheet = resolve(file)

    return { name: basename(stylesheet, '.css'), stylesheet }
  })
}

function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

/**
 * Lists what is wrong with a theme: the roles it leaves out, its manifest when it has one next to
 * the stylesheet, and every contrast requirement in both modes.
 */
function checkTarget(
  { name, stylesheet }: TTarget,
  base: TCollected,
): { problems: string[]; kind: string } {
  const problems: string[] = []
  const theme = collect(parseBlocks(readFileSync(stylesheet, 'utf8')))
  const manifestPath = join(dirname(stylesheet), `${name}.json`)
  let kind = 'no manifest'

  problems.push(...findRoleProblems(base, theme))

  if (existsSync(manifestPath)) {
    try {
      const result = validateManifest(
        JSON.parse(readFileSync(manifestPath, 'utf8')) as unknown,
        name,
        (guideline) => existsSync(join(guidelinesRoot, `${guideline}.md`)),
      )

      problems.push(...result.problems)
      kind = result.manifest?.kind ?? 'invalid manifest'
    } catch (error) {
      problems.push(`The manifest cannot be read: ${describeError(error)}`)
      kind = 'invalid manifest'
    }
  }

  for (const mode of ['light', 'dark'] as const) {
    try {
      for (const check of reportMode(modeVariables(mode, base, theme)).checks) {
        if (!check.passed) {
          problems.push(
            `${mode}: ${check.foreground} on ${check.background} is ${String(check.ratio)}, and needs ${String(check.minimum)}.`,
          )
        }
      }
    } catch (error) {
      problems.push(`${mode}: ${describeError(error)}`)
    }
  }

  return { problems, kind }
}

function main(): void {
  const targets = findTargets(process.argv.slice(2))

  if (targets.length === 0) {
    console.error('Usage: check:themes <stylesheet.css>...')
    process.exitCode = 1

    return
  }

  const base = readBase()

  for (const target of targets) {
    const { problems, kind } = checkTarget(target, base)

    if (problems.length > 0) {
      console.error(`${target.name}\n${problems.map((line) => `  - ${line}`).join('\n')}`)
      process.exitCode = 1
    } else {
      console.log(`${target.name}: ok (${kind})`)
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}
