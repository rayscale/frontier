import * as frontier from '@rayscale/frontier'
import {
  Badge,
  Input,
  Search,
  symbolMetadata,
  type TSymbolComponent,
  type TSymbolMetadata,
} from '@rayscale/frontier'
import { type ReactElement, useState } from 'react'

import { HighlightedCode } from './docs-code-block.js'

const library: { [name: string]: unknown } = frontier

function isSymbolComponent(value: unknown): value is TSymbolComponent {
  return typeof value === 'object' && value !== null && 'symbolNode' in value
}

function getSymbolComponent(metadata: TSymbolMetadata): TSymbolComponent | undefined {
  const value = library[metadata.component]

  return isSymbolComponent(value) ? value : undefined
}

function matches(metadata: TSymbolMetadata, query: string): boolean {
  const terms = [
    metadata.name,
    ...metadata.keywords,
    ...metadata.aliases,
    ...metadata.categories,
    ...metadata.tags,
  ]

  return terms.some((term) => term.toLowerCase().includes(query))
}

function SymbolDetail({ metadata }: { metadata: TSymbolMetadata }): ReactElement {
  const Current = getSymbolComponent(metadata)

  return (
    <section className="symbol-gallery__detail" aria-label={`${metadata.component} symbol`}>
      <div className="symbol-gallery__preview" aria-hidden="true">
        {Current ? <Current size={48} /> : null}
      </div>
      <div className="symbol-gallery__facts">
        <h3>{metadata.component}</h3>
        <p>{metadata.description}</p>
        <p className="symbol-gallery__badges">
          {metadata.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </p>
        <HighlightedCode
          language="tsx"
          code={`import { ${metadata.component} } from '@rayscale/frontier'\n\n<${metadata.component} />`}
        />
      </div>
    </section>
  )
}

/** Searchable catalog of every symbol, with the usage of the one selected. */
export default function SymbolGallery(): ReactElement {
  const [query, setQuery] = useState('')
  const [selectedName, setSelectedName] = useState(symbolMetadata[0]?.name)
  const normalized = query.trim().toLowerCase()
  const visible = symbolMetadata.filter((metadata) => matches(metadata, normalized))
  const selected = symbolMetadata.find((metadata) => metadata.name === selectedName)

  return (
    <div className="symbol-gallery">
      <Input
        type="search"
        label="Search symbols"
        placeholder="Name, keyword, or category"
        value={query}
        leadingSymbol={<Search aria-hidden="true" />}
        onChange={(event) => {
          setQuery(event.target.value)
        }}
      />
      <p className="symbol-gallery__count" role="status">
        {visible.length} {visible.length === 1 ? 'symbol' : 'symbols'}
      </p>
      <ul className="symbol-gallery__grid">
        {visible.map((metadata) => {
          const Current = getSymbolComponent(metadata)

          return (
            <li key={metadata.name}>
              <button
                type="button"
                className="symbol-gallery__item"
                aria-pressed={metadata.name === selectedName}
                onClick={() => {
                  setSelectedName(metadata.name)
                }}
              >
                {Current ? <Current aria-hidden="true" /> : null}
                <span>{metadata.name}</span>
              </button>
            </li>
          )
        })}
      </ul>
      {selected ? <SymbolDetail metadata={selected} /> : null}
    </div>
  )
}
