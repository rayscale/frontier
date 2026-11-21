import { describe, expect, it } from 'vitest'

import {
  collect,
  contrastRatio,
  findOverrides,
  findRoleProblems,
  formatStylesheet,
  modeVariables,
  parseBlocks,
  parseColor,
  reportMode,
  resolveValue,
  validateManifest,
} from './generate-themes.js'

const passingRoles: { [role: string]: string } = {
  background: '#ffffff',
  surface: '#ffffff',
  'surface-raised': '#ffffff',
  'surface-floating': '#ffffff',
  text: '#111111',
  'text-muted': '#444444',
  primary: '#111111',
  'on-primary': '#ffffff',
  secondary: '#eeeeee',
  'on-secondary': '#111111',
  danger: '#990000',
  'danger-subtle': '#ffffff',
  success: '#006600',
  'success-subtle': '#ffffff',
  warning: '#664400',
  'warning-subtle': '#ffffff',
  info: '#003399',
  'info-subtle': '#ffffff',
  focus: '#111111',
}

function toVariables(roles: { [role: string]: string }): { [property: string]: string } {
  return Object.fromEntries(
    Object.entries(roles).map(([role, value]) => [`--frontier-color-${role}`, value]),
  )
}

describe('theme generator', () => {
  describe('colors', () => {
    it('reads hex and rgb colors, with and without alpha', () => {
      expect(parseColor('#fd5d2a')).toEqual({ r: 253, g: 93, b: 42, a: 1 })
      expect(parseColor('#fff')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
      expect(parseColor('rgb(253 93 42 / 25%)')).toEqual({ r: 253, g: 93, b: 42, a: 0.25 })
      expect(parseColor('rgba(0, 0, 0, 0.5)')).toEqual({ r: 0, g: 0, b: 0, a: 0.5 })
    })

    it('rejects a color it cannot read', () => {
      expect(() => parseColor('orange')).toThrow('Cannot read the color orange.')
    })

    it('measures the contrast of black on white and of a color on itself', () => {
      const black = parseColor('#000000')
      const white = parseColor('#ffffff')

      expect(contrastRatio(black, white)).toBeCloseTo(21, 5)
      expect(contrastRatio(white, white)).toBeCloseTo(1, 5)
    })
  })

  describe('stylesheets', () => {
    const css = `
      /* Palette */
      :root { --a: #111111; --b: var(--a); }
      :root, [data-mode='light'] { --role: var(--b); }
      [data-mode='dark'] { --role: #ffffff; }
    `

    it('groups declarations by the mode they apply to', () => {
      expect(collect(parseBlocks(css))).toEqual({
        shared: { '--a': '#111111', '--b': 'var(--a)' },
        light: { '--role': 'var(--b)' },
        dark: { '--role': '#ffffff' },
      })
    })

    it('resolves values through the variables they refer to', () => {
      const variables = { '--a': '#111111', '--b': 'var(--a)' }

      expect(resolveValue('0 0 var(--b)', variables)).toBe('0 0 #111111')
    })

    it('rejects a variable that is missing or refers to itself', () => {
      expect(() => resolveValue('var(--missing)', {})).toThrow('--missing is not declared.')
      expect(() => resolveValue('var(--a)', { '--a': 'var(--a)' })).toThrow('refers to itself')
    })
  })

  describe('modes', () => {
    it('passes when every pair meets its minimum', () => {
      const report = reportMode(toVariables(passingRoles))

      expect(report.checks.every((check) => check.passed)).toBe(true)
    })

    it('fails the pair that is too faint', () => {
      const report = reportMode(toVariables({ ...passingRoles, 'text-muted': '#eeeeee' }))
      const failed = report.checks.filter((check) => !check.passed)

      expect(failed.map((check) => `${check.foreground}/${check.background}`)).toEqual([
        'text-muted/background',
        'text-muted/surface',
      ])
    })

    it('layers a theme over the base, and the dark overrides over both', () => {
      const base = collect(
        parseBlocks(`
          :root, [data-mode='light'] { --frontier-color-text: #111111; --frontier-radius: 1rem; }
          [data-mode='dark'] { --frontier-color-text: #eeeeee; }
        `),
      )
      const theme = collect(
        parseBlocks(`
          [data-theme='x'] { --frontier-color-text: #222222; --frontier-radius: 2rem; }
          [data-theme='x'][data-mode='dark'] { --frontier-color-text: #dddddd; }
        `),
      )

      expect(modeVariables('light', base, theme)['--frontier-color-text']).toBe('#222222')
      expect(modeVariables('dark', base, theme)['--frontier-color-text']).toBe('#dddddd')
      expect(modeVariables('dark', base, theme)['--frontier-radius']).toBe('2rem')
    })
  })

  describe('roles and overrides', () => {
    const base = collect(
      parseBlocks(`
        :root, [data-mode='light'] { --frontier-color-text: #111111; --frontier-radius: 1rem; }
        [data-mode='dark'] { --frontier-color-text: #eeeeee; }
      `),
    )

    it('lists the roles a theme leaves out, and the roles that do not exist', () => {
      const theme = collect(
        parseBlocks(`
          [data-theme='x'] { --frontier-color-text: #222222; --frontier-color-extra: #333333; }
        `),
      )

      expect(findRoleProblems(base, theme)).toEqual([
        '--frontier-color-text is not declared for the dark mode.',
        '--frontier-color-extra is not a color role of the system.',
      ])
    })

    it('lists only the values other than colors that differ from the base', () => {
      const theme = collect(
        parseBlocks(`
          [data-theme='x'] { --frontier-color-text: #222222; --frontier-radius: 2rem; }
        `),
      )

      expect(findOverrides(base, theme)).toEqual({ '--frontier-radius': '2rem' })
    })
  })

  describe('stylesheet', () => {
    it('imports every theme that has a stylesheet', () => {
      expect(formatStylesheet(['bisnes', 'paper'])).toContain(
        "@import './bisnes.css';\n@import './paper.css';\n",
      )
    })
  })

  describe('manifests', () => {
    const exists = (guideline: string): boolean => guideline === 'foundations/typeface'

    it('accepts a conformant theme and an extended theme with a departure', () => {
      const conformant = validateManifest(
        { name: 'paper', title: 'Paper', description: 'Warm.', kind: 'conformant', departures: [] },
        'paper',
        exists,
      )
      const extended = validateManifest(
        {
          name: 'mono',
          title: 'Mono',
          description: 'Fixed width.',
          kind: 'extended',
          departures: [{ guideline: 'foundations/typeface', reason: 'It is set in a mono face.' }],
        },
        'mono',
        exists,
      )

      expect(conformant.problems).toEqual([])
      expect(extended.problems).toEqual([])
      expect(extended.manifest?.departures).toHaveLength(1)
    })

    it('reports a kind that does not match its departures', () => {
      const departure = { guideline: 'foundations/typeface', reason: 'A reason.' }

      expect(
        validateManifest(
          { name: 'a', title: 'A', description: 'A.', kind: 'conformant', departures: [departure] },
          'a',
          exists,
        ).problems,
      ).toEqual(['A conformant theme has no departures. Make it extended, or remove them.'])
      expect(
        validateManifest(
          { name: 'a', title: 'A', description: 'A.', kind: 'extended', departures: [] },
          'a',
          exists,
        ).problems,
      ).toEqual(['An extended theme names at least one departure.'])
    })

    it('reports a guideline that does not exist and a name that does not match', () => {
      const result = validateManifest(
        {
          name: 'other',
          title: 'A',
          description: 'A.',
          kind: 'extended',
          departures: [{ guideline: 'foundations/missing', reason: 'A reason.' }],
        },
        'a',
        exists,
      )

      expect(result.problems).toEqual([
        'The name must be "a", like the file.',
        'The guideline foundations/missing does not exist.',
        'An extended theme names at least one departure.',
      ])
    })
  })
})
