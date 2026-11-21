'use client'

import { Badge, ControlGroup, Input, Select } from '@rayscale/frontier'
import Link from 'next/link'
import { type ReactElement, useMemo, useState } from 'react'

import { symbolCatalog, symbolCategories, type TSymbolCatalogEntry } from '#/docs/symbol-catalog.js'

import { HighlightedCode } from './highlighted-code.js'

import './symbol-gallery.css'

function SymbolDetail({ entry }: { entry: TSymbolCatalogEntry }): ReactElement {
  const Current = entry.symbolComponent

  return (
    <section className="symbol-gallery__detail" aria-label={`${entry.component} symbol`}>
      <div className="symbol-gallery__preview" aria-hidden="true">
        <Current size={48} />
      </div>
      <div className="symbol-gallery__facts">
        <h3>{entry.component}</h3>
        <p>{entry.description}</p>
        <p className="symbol-gallery__badges">
          {entry.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </p>
        <HighlightedCode
          language="tsx"
          code={`import { ${entry.component} } from '@rayscale/frontier'\n\n<${entry.component} />`}
        />
      </div>
    </section>
  )
}

/**
 * Searchable catalog of every symbol. `stacked` links each tile to the symbol's
 * own page; `split` keeps the selected symbol's usage beside the grid.
 */
export default function SymbolGallery({
  layout = 'stacked',
}: {
  /** `split` shows the selected symbol beside the grid; `stacked` links each symbol to its page. */
  layout?: 'split' | 'stacked'
}): ReactElement {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [selectedName, setSelectedName] = useState(symbolCatalog[0]?.name)

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()

    return symbolCatalog.filter((entry) => {
      if (category !== 'all' && !entry.categories.includes(category)) {
        return false
      }

      return search.length === 0 || entry.searchText.includes(search)
    })
  }, [category, query])

  const selected = symbolCatalog.find((entry) => entry.name === selectedName)

  return (
    <div className="symbol-gallery" data-layout={layout}>
      <div className="symbol-gallery__toolbar">
        <ControlGroup className="symbol-gallery__controls">
          <Input
            aria-label="Search symbols"
            onChange={(event) => {
              setQuery(event.target.value)
            }}
            placeholder="Search symbols…"
            type="search"
            value={query}
          />
          <Select.Root
            onValueChange={(value) => {
              setCategory(value ?? 'all')
            }}
            value={category}
          >
            <Select.Trigger aria-label="Filter symbols by category">
              <Select.Value />
              <Select.Symbol />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                {symbolCategories.map((item) => (
                  <Select.Item key={item} value={item}>
                    {item === 'all' ? 'All categories' : item}
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Content>
          </Select.Root>
        </ControlGroup>
        <p className="symbol-gallery__count" role="status" aria-live="polite">
          {filtered.length} of {symbolCatalog.length} symbols
        </p>
      </div>

      <div className="symbol-gallery__body">
        {filtered.length > 0 ? (
          <ul className="symbol-gallery__grid">
            {filtered.map((entry) => {
              const Current = entry.symbolComponent
              const content = (
                <>
                  <Current aria-hidden="true" size={20} />
                  <span className="symbol-gallery__label">{entry.name}</span>
                </>
              )

              return (
                <li key={entry.name}>
                  {layout === 'split' ? (
                    <button
                      type="button"
                      className="symbol-gallery__item"
                      aria-pressed={entry.name === selectedName}
                      title={entry.description}
                      onClick={() => {
                        setSelectedName(entry.name)
                      }}
                    >
                      {content}
                    </button>
                  ) : (
                    <Link
                      className="symbol-gallery__item"
                      href={`/docs/symbols/${entry.name}`}
                      title={entry.description}
                    >
                      {content}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="symbol-gallery__count">No symbols match the current search.</p>
        )}
        {layout === 'split' && selected ? <SymbolDetail entry={selected} /> : null}
      </div>
    </div>
  )
}
