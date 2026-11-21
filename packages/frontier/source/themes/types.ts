/** Whether a theme changes only open values, or departs from a guideline on purpose. */
export type TThemeKind = 'conformant' | 'extended'

/** A color mode of a theme. Every theme defines both. */
export type TThemeMode = 'light' | 'dark'

/** One guideline that an extended theme departs from, with the reason. */
export interface TThemeDeparture {
  /** The guideline, as its path under `guidelines/`, such as `foundations/typeface`. */
  guideline: string
  /** Why the theme departs from the guideline. */
  reason: string
}

/** The result of one contrast requirement in one mode. */
export interface TThemeCheck {
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

/** The color roles of a theme in one mode, and how they measure up. */
export interface TThemeModeReport {
  /** Resolved color of each role, keyed by the role without the `--frontier-color-` prefix. */
  colors: { [role: string]: string }
  checks: TThemeCheck[]
}

/** Descriptive data for one theme, derived from its manifest and its styles. */
export interface TThemeMetadata {
  /** Kebab-case name, as set in `data-theme`. */
  name: string
  /** Human-readable name. */
  title: string
  /** What the theme is for. */
  description: string
  kind: TThemeKind
  /** Guidelines the theme departs from. Empty for a conformant theme. */
  departures: TThemeDeparture[]
  /** Values other than colors that the theme changes, keyed by token. */
  overrides: { [token: string]: string }
  modes: { light: TThemeModeReport; dark: TThemeModeReport }
}
