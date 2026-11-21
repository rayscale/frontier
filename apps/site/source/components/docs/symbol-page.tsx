'use client'

import {
  Badge,
  CopyButton,
  Disclosure,
  SegmentedControl,
  type TSegmentedControlOption,
} from '@rayscale/frontier'
import Link from 'next/link'
import { type ReactElement, useMemo, useState } from 'react'

import {
  getRelatedSymbols,
  symbolCatalogByName,
  toImportStatement,
  toJsxSnippet,
  toJsxUsage,
  toSvgMarkup,
} from '#/docs/symbol-catalog.js'

import { HighlightedCode } from './highlighted-code.js'

import './symbol-page.css'

const colors = ['default', 'muted', 'success', 'danger'] as const
const sizes = ['16', '24', '32', '48'] as const

type TColor = (typeof colors)[number]
type TSize = (typeof sizes)[number]

const colorLabels: { [color in TColor]: string } = {
  default: 'Default',
  muted: 'Muted',
  success: 'Success',
  danger: 'Danger',
}

const sizeOptions = sizes.map(
  (size) => ({ label: size, value: size }) as const,
) satisfies readonly TSegmentedControlOption<TSize>[]

const colorOptions = colors.map(
  (color) => ({ label: colorLabels[color], value: color }) as const,
) satisfies readonly TSegmentedControlOption<TColor>[]

export interface SymbolPageProps {
  /** Kebab-case symbol name from the route. */
  name: string
}

/** Interactive preview, copy actions, and metadata for one symbol. */
export function SymbolPage({ name }: SymbolPageProps): ReactElement | null {
  const entry = symbolCatalogByName.get(name)
  const [size, setSize] = useState<TSize>('24')
  const [color, setColor] = useState<TColor>('default')

  const terms = useMemo(() => {
    if (!entry) {
      return []
    }

    const ignored = new Set([entry.name.toLowerCase(), entry.component.toLowerCase()])

    return Array.from(
      new Set(
        [...entry.keywords, ...entry.tags, ...entry.aliases].filter(
          (term) => !ignored.has(term.toLowerCase()),
        ),
      ),
    )
  }, [entry])

  const related = useMemo(() => (entry ? getRelatedSymbols(entry) : []), [entry])

  if (!entry) {
    return null
  }

  const Current = entry.symbolComponent

  return (
    <div className="symbol-page">
      <header className="symbol-page__header">
        <h1>{entry.component}</h1>
        <p className="symbol-page__slug">{entry.name}</p>
        <p className="symbol-page__description">{entry.description}</p>
      </header>

      <div className="symbol-page__preview" data-color={color}>
        <Current aria-hidden="true" size={Number(size)} />
      </div>

      <div className="symbol-page__controls">
        <SegmentedControl
          label="Size"
          onChange={setSize}
          options={sizeOptions}
          size="small"
          value={size}
        />
        <SegmentedControl
          label="Color"
          onChange={setColor}
          options={colorOptions}
          size="small"
          value={color}
        />
      </div>

      <div className="symbol-page__actions">
        <CopyButton label="Copy SVG" value={toSvgMarkup(entry)} />
        <CopyButton label="Copy JSX" value={toJsxUsage(entry)} />
        <CopyButton label="Copy import" value={toImportStatement(entry)} />
      </div>

      <section className="symbol-page__section" aria-labelledby="symbol-page-usage">
        <h2 id="symbol-page-usage">Usage</h2>
        <HighlightedCode code={toJsxSnippet(entry)} language="tsx" />
        <p>A symbol is decorative. Name the control that contains it, never the symbol itself.</p>
        <Disclosure className="symbol-page__markup" title="SVG markup">
          <HighlightedCode code={toSvgMarkup(entry)} language="xml" />
        </Disclosure>
      </section>

      <section className="symbol-page__section" aria-labelledby="symbol-page-metadata">
        <h2 id="symbol-page-metadata">Metadata</h2>
        <dl className="symbol-page__meta">
          <div>
            <dt>Categories</dt>
            <dd>
              {entry.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </dd>
          </div>
          {terms.length > 0 ? (
            <div>
              <dt>Keywords</dt>
              <dd>
                {terms.map((term) => (
                  <Badge key={term} variant="outline">
                    {term}
                  </Badge>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>

      {related.length > 0 ? (
        <section className="symbol-page__section" aria-labelledby="symbol-page-related">
          <h2 id="symbol-page-related">More like this</h2>
          <ul className="symbol-page__related">
            {related.map((item) => (
              <li key={item.name}>
                <Link
                  className="symbol-page__tile"
                  href={`/docs/symbols/${item.name}`}
                  title={item.description}
                >
                  <item.symbolComponent aria-hidden="true" size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
