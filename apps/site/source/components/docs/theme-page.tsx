'use client'

import { Badge, Button } from '@rayscale/frontier'
import {
  themeMetadataByName,
  type TThemeCheck,
  type TThemeMetadata,
  type TThemeMode,
} from '@rayscale/frontier/theme-metadata'
import type { ReactElement } from 'react'

import { defaultTheme, useTheme } from '#/components/theme/index.js'

import { createHeading } from './docs-heading.js'
import { DocsLink } from './docs-link.js'
import {
  DocsTable,
  DocsTableBody,
  DocsTableCell,
  DocsTableHead,
  DocsTableHeader,
  DocsTableRow,
} from './docs-table.js'
import { ThemePreview } from './theme-preview.js'

import './theme-docs.css'

const H2 = createHeading('h2')
const H3 = createHeading('h3')

const modes: readonly TThemeMode[] = ['light', 'dark']

/** The roles that show a theme at a glance. */
const swatchRoles = [
  'primary',
  'on-primary',
  'secondary',
  'background',
  'surface-sunken',
  'text',
  'text-muted',
  'text-subtle',
  'border',
  'focus',
  'danger',
  'success',
  'warning',
  'info',
]

const modeTitles: { [mode in TThemeMode]: string } = { light: 'Light', dark: 'Dark' }

function guidelineTitle(guideline: string): string {
  const name = guideline.split('/').at(-1) ?? guideline

  return name.charAt(0).toUpperCase() + name.slice(1)
}

function describeCheck(check: TThemeCheck): string {
  return `${check.foreground} on ${check.background}`
}

function Summary({ theme }: { theme: TThemeMetadata }): ReactElement {
  const { theme: active, setTheme } = useTheme()
  const extended = theme.kind === 'extended'

  return (
    <div className="theme-page__summary">
      <Badge variant={extended ? 'outline' : 'secondary'}>
        {extended ? 'Extended' : 'Conformant'}
      </Badge>
      <p>
        {extended
          ? `Departs from ${String(theme.departures.length)} ${theme.departures.length === 1 ? 'guideline' : 'guidelines'} on purpose, and still meets every contrast requirement.`
          : 'Changes only the values that the guidelines leave open, and meets every contrast requirement.'}
      </p>
      {active === theme.name ? (
        <Badge>In use</Badge>
      ) : (
        <Button
          onClick={() => {
            setTheme(theme.name)
          }}
        >
          Use {theme.title}
        </Button>
      )}
    </div>
  )
}

function Values({ theme }: { theme: TThemeMetadata }): ReactElement {
  const overrides = Object.entries(theme.overrides)

  if (theme.name === defaultTheme) {
    return <p>This is the default theme. The other themes change its values.</p>
  }

  if (overrides.length === 0) {
    return <p>This theme changes no value other than its colors.</p>
  }

  return (
    <DocsTable>
      <DocsTableHeader>
        <DocsTableRow>
          <DocsTableHead>Token</DocsTableHead>
          <DocsTableHead>Value</DocsTableHead>
        </DocsTableRow>
      </DocsTableHeader>
      <DocsTableBody>
        {overrides.map(([token, value]) => (
          <DocsTableRow key={token}>
            <DocsTableCell>
              <code>{token}</code>
            </DocsTableCell>
            <DocsTableCell>
              <code>{value}</code>
            </DocsTableCell>
          </DocsTableRow>
        ))}
      </DocsTableBody>
    </DocsTable>
  )
}

function Swatches({ theme, mode }: { theme: TThemeMetadata; mode: TThemeMode }): ReactElement {
  const { colors } = theme.modes[mode]

  return (
    <ul className="theme-page__swatches">
      {swatchRoles.map((role) => {
        const color = colors[role]

        return color === undefined ? null : (
          <li key={role} className="theme-page__swatch">
            <span className="theme-page__swatch-color" style={{ backgroundColor: color }} />
            <span className="theme-page__swatch-text">
              <span>{role}</span>
              <span>{color}</span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

function Contrast({ theme, mode }: { theme: TThemeMetadata; mode: TThemeMode }): ReactElement {
  return (
    <DocsTable>
      <DocsTableHeader>
        <DocsTableRow>
          <DocsTableHead>Pair</DocsTableHead>
          <DocsTableHead align="right">Ratio</DocsTableHead>
          <DocsTableHead align="right">Minimum</DocsTableHead>
          <DocsTableHead>Result</DocsTableHead>
        </DocsTableRow>
      </DocsTableHeader>
      <DocsTableBody>
        {theme.modes[mode].checks.map((check) => (
          <DocsTableRow key={describeCheck(check)}>
            <DocsTableCell>{describeCheck(check)}</DocsTableCell>
            <DocsTableCell align="right">{check.ratio.toFixed(2)}</DocsTableCell>
            <DocsTableCell align="right">{check.minimum}</DocsTableCell>
            <DocsTableCell>{check.passed ? 'Pass' : 'Fail'}</DocsTableCell>
          </DocsTableRow>
        ))}
      </DocsTableBody>
    </DocsTable>
  )
}

/**
 * The page of one theme, drawn from its metadata: a live preview in both modes, the guidelines it
 * departs from, the values it changes, its colors, and how every contrast requirement measures up.
 */
export function ThemePage({ name }: { name: string }): ReactElement | null {
  const theme = themeMetadataByName[name]

  if (!theme) {
    return null
  }

  return (
    <div className="theme-page">
      <Summary theme={theme} />

      <H2 id="preview">Preview</H2>
      <div className="theme-page__previews">
        {modes.map((mode) => (
          <ThemePreview key={mode} theme={theme.name} title={theme.title} mode={mode} />
        ))}
      </div>

      {theme.departures.length > 0 ? (
        <>
          <H2 id="departures">Departures</H2>
          <ul className="theme-page__departures">
            {theme.departures.map((departure) => (
              <li key={departure.guideline}>
                <DocsLink href={`/docs/guidelines/${departure.guideline}`}>
                  {guidelineTitle(departure.guideline)}
                </DocsLink>
                . {departure.reason}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <H2 id="values">Values</H2>
      <Values theme={theme} />

      <H2 id="colors">Colors</H2>
      {modes.map((mode) => (
        <div key={mode}>
          <H3 id={`colors-${mode}`}>{modeTitles[mode]}</H3>
          <Swatches theme={theme} mode={mode} />
        </div>
      ))}

      <H2 id="contrast">Contrast</H2>
      <p>
        Text meets 4.5 and the focus indicator meets 3, in both modes. The build fails when a
        requirement is not met.
      </p>
      {modes.map((mode) => (
        <div key={mode}>
          <H3 id={`contrast-${mode}`}>{modeTitles[mode]}</H3>
          <Contrast theme={theme} mode={mode} />
        </div>
      ))}
    </div>
  )
}
