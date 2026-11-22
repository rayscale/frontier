'use client'

import { Badge, ControlGroup, Input, Select } from '@rayscale/frontier'
import Link from 'next/link'
import { type ReactElement, useMemo, useState } from 'react'

import {
  iconCatalog,
  iconCategories,
  type TIconCatalogEntry,
} from '#/documentation/icon-catalog.js'

import { HighlightedCode } from './highlighted-code.js'

import './icon-gallery.css'

function IconDetail({ entry }: { entry: TIconCatalogEntry }): ReactElement {
  const Current = entry.iconComponent

  return (
    <section className="icon-gallery__detail" aria-label={`${entry.component} icon`}>
      <div className="icon-gallery__preview" aria-hidden="true">
        <Current size={48} />
      </div>
      <div className="icon-gallery__facts">
        <h3>{entry.component}</h3>
        <p>{entry.description}</p>
        <p className="icon-gallery__badges">
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
 * Searchable catalog of every icon. `stacked` links each tile to the icon's
 * own page; `split` keeps the selected icon's usage beside the grid.
 */
export default function IconGallery({
  layout = 'stacked',
}: {
  /** `split` shows the selected icon beside the grid; `stacked` links each icon to its page. */
  layout?: 'split' | 'stacked'
}): ReactElement {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [selectedName, setSelectedName] = useState(iconCatalog[0]?.name)

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()

    return iconCatalog.filter((entry) => {
      if (category !== 'all' && !entry.categories.includes(category)) {
        return false
      }

      return search.length === 0 || entry.searchText.includes(search)
    })
  }, [category, query])

  const selected = iconCatalog.find((entry) => entry.name === selectedName)

  return (
    <div className="icon-gallery" data-layout={layout}>
      <div className="icon-gallery__toolbar">
        <ControlGroup className="icon-gallery__controls">
          <Input
            aria-label="Search icons"
            onChange={(event) => {
              setQuery(event.target.value)
            }}
            placeholder="Search icons…"
            type="search"
            value={query}
          />
          <Select.Root
            onValueChange={(value) => {
              setCategory(value ?? 'all')
            }}
            value={category}
          >
            <Select.Trigger aria-label="Filter icons by category">
              <Select.Value />
              <Select.Icon />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                {iconCategories.map((item) => (
                  <Select.Item key={item} value={item}>
                    {item === 'all' ? 'All categories' : item}
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Content>
          </Select.Root>
        </ControlGroup>
        <p className="icon-gallery__count" role="status" aria-live="polite">
          {filtered.length} of {iconCatalog.length} icons
        </p>
      </div>

      <div className="icon-gallery__body">
        {filtered.length > 0 ? (
          <ul className="icon-gallery__grid">
            {filtered.map((entry) => {
              const Current = entry.iconComponent
              const content = (
                <>
                  <Current aria-hidden="true" size={20} />
                  <span className="icon-gallery__label">{entry.name}</span>
                </>
              )

              return (
                <li key={entry.name}>
                  {layout === 'split' ? (
                    <button
                      type="button"
                      className="icon-gallery__item"
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
                      className="icon-gallery__item"
                      href={`/documentation/icons/${entry.name}`}
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
          <p className="icon-gallery__count">No icons match the current search.</p>
        )}
        {layout === 'split' && selected ? <IconDetail entry={selected} /> : null}
      </div>
    </div>
  )
}
