import * as frontier from '@rayscale/frontier'
import type { TSymbolComponent, TSymbolMetadata } from '@rayscale/frontier'

/** A catalog entry combining public symbol metadata with its component. */
export interface TSymbolCatalogEntry {
  name: string
  component: string
  symbolComponent: TSymbolComponent
  description: string
  keywords: string[]
  categories: string[]
  aliases: string[]
  tags: string[]
  useCases: string[]
  searchText: string
}

const library: { [name: string]: unknown } = frontier

function isSymbolComponent(value: unknown): value is TSymbolComponent {
  return typeof value === 'object' && value !== null && 'symbolNode' in value
}

function getSymbolComponent(metadata: TSymbolMetadata): TSymbolComponent | undefined {
  const value = library[metadata.component]

  return isSymbolComponent(value) ? value : undefined
}

function toCatalogEntry(
  metadata: TSymbolMetadata,
  symbolComponent: TSymbolComponent,
): TSymbolCatalogEntry {
  return {
    name: metadata.name,
    component: metadata.component,
    symbolComponent,
    description: metadata.description,
    keywords: metadata.keywords,
    categories: metadata.categories,
    aliases: metadata.aliases,
    tags: metadata.tags,
    useCases: metadata.useCases,
    searchText: [
      metadata.name,
      metadata.component,
      metadata.description,
      ...metadata.categories,
      ...metadata.keywords,
      ...metadata.tags,
      ...metadata.aliases,
    ]
      .join(' ')
      .toLowerCase(),
  }
}

/** Every symbol the package exports, sorted by its kebab-case name. */
export const symbolCatalog: TSymbolCatalogEntry[] = frontier.symbolMetadata.flatMap((metadata) => {
  const symbolComponent = getSymbolComponent(metadata)

  return symbolComponent ? [toCatalogEntry(metadata, symbolComponent)] : []
})

export const symbolCatalogByName = new Map(symbolCatalog.map((entry) => [entry.name, entry]))

/** Category filters for the catalog, in alphabetical order. */
export const symbolCategories = [
  'all',
  ...Array.from(new Set(symbolCatalog.flatMap((entry) => entry.categories))).sort(),
]

const attributeNames: { [name: string]: string } = { className: 'class' }

function toAttributeName(name: string): string {
  return (
    attributeNames[name] ?? name.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`)
  )
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** Serializes a symbol into a standalone SVG document on the 24-unit grid. */
export function toSvgMarkup(entry: TSymbolCatalogEntry): string {
  const shapes = entry.symbolComponent.symbolNode.map(([tag, attributes]) => {
    const rendered = Object.entries(attributes)
      .map(([key, value]) => ` ${toAttributeName(key)}="${escapeAttribute(String(value))}"`)
      .join('')

    return `  <${tag}${rendered} />`
  })

  return [
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
    ...shapes,
    '</svg>',
  ].join('\n')
}

/** The import statement that brings one symbol into a project. */
export function toImportStatement(entry: TSymbolCatalogEntry): string {
  return `import { ${entry.component} } from '@rayscale/frontier'`
}

/** The JSX element for one symbol. */
export function toJsxUsage(entry: TSymbolCatalogEntry): string {
  return `<${entry.component} aria-hidden="true" />`
}

/** A copyable snippet showing the import and the element together. */
export function toJsxSnippet(entry: TSymbolCatalogEntry): string {
  return `${toImportStatement(entry)}\n\n${toJsxUsage(entry)}`
}

const categoryUsage = new Map<string, number>()
for (const entry of symbolCatalog) {
  for (const category of entry.categories) {
    categoryUsage.set(category, (categoryUsage.get(category) ?? 0) + 1)
  }
}

/** Broad categories cover most of the set and say little about which symbols belong together. */
const maxDiscriminatingUsage = Math.max(1, symbolCatalog.length * 0.1)

function isDiscriminating(category: string): boolean {
  return (categoryUsage.get(category) ?? 0) <= maxDiscriminatingUsage
}

/**
 * Ranks symbols sharing specific categories, keywords, tags, or aliases with the
 * given symbol. Category matches weigh more because they describe broader intent.
 */
export function getRelatedSymbols(entry: TSymbolCatalogEntry, limit = 8): TSymbolCatalogEntry[] {
  const categories = new Set(entry.categories.filter(isDiscriminating))
  const terms = new Set(
    [...entry.keywords, ...entry.tags, ...entry.aliases].map((term) => term.toLowerCase()),
  )

  return symbolCatalog
    .filter((candidate) => candidate.name !== entry.name)
    .map((candidate) => {
      const categoryScore = candidate.categories.filter((category) =>
        categories.has(category),
      ).length
      const termScore = [...candidate.keywords, ...candidate.tags, ...candidate.aliases].filter(
        (term) => terms.has(term.toLowerCase()),
      ).length

      return { candidate, score: categoryScore * 2 + termScore }
    })
    .filter(({ score }) => score > 0)
    .sort(
      (first, second) =>
        second.score - first.score || first.candidate.name.localeCompare(second.candidate.name),
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}
