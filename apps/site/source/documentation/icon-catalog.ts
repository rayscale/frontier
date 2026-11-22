import * as frontier from '@rayscale/frontier'
import type { TIconComponent, TIconMetadata } from '@rayscale/frontier'

/** A catalog entry combining public icon metadata with its component. */
export interface TIconCatalogEntry {
  name: string
  component: string
  iconComponent: TIconComponent
  description: string
  keywords: string[]
  categories: string[]
  aliases: string[]
  tags: string[]
  useCases: string[]
  searchText: string
}

const library: { [name: string]: unknown } = frontier

function isIconComponent(value: unknown): value is TIconComponent {
  return typeof value === 'object' && value !== null && 'iconNode' in value
}

function getIconComponent(metadata: TIconMetadata): TIconComponent | undefined {
  const value = library[metadata.component]

  return isIconComponent(value) ? value : undefined
}

function toCatalogEntry(metadata: TIconMetadata, iconComponent: TIconComponent): TIconCatalogEntry {
  return {
    name: metadata.name,
    component: metadata.component,
    iconComponent,
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

/** Every icon the package exports, sorted by its kebab-case name. */
export const iconCatalog: TIconCatalogEntry[] = frontier.iconMetadata.flatMap((metadata) => {
  const iconComponent = getIconComponent(metadata)

  return iconComponent ? [toCatalogEntry(metadata, iconComponent)] : []
})

export const iconCatalogByName = new Map(iconCatalog.map((entry) => [entry.name, entry]))

/** Category filters for the catalog, in alphabetical order. */
export const iconCategories = [
  'all',
  ...Array.from(new Set(iconCatalog.flatMap((entry) => entry.categories))).sort(),
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

/** Serializes an icon into a standalone SVG document on the 24-unit grid. */
export function toSvgMarkup(entry: TIconCatalogEntry): string {
  const shapes = entry.iconComponent.iconNode.map(([tag, attributes]) => {
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

/** The import statement that brings one icon into a project. */
export function toImportStatement(entry: TIconCatalogEntry): string {
  return `import { ${entry.component} } from '@rayscale/frontier'`
}

/** The JSX element for one icon. */
export function toJsxUsage(entry: TIconCatalogEntry): string {
  return `<${entry.component} aria-hidden="true" />`
}

/** A copyable snippet showing the import and the element together. */
export function toJsxSnippet(entry: TIconCatalogEntry): string {
  return `${toImportStatement(entry)}\n\n${toJsxUsage(entry)}`
}

const categoryUsage = new Map<string, number>()
for (const entry of iconCatalog) {
  for (const category of entry.categories) {
    categoryUsage.set(category, (categoryUsage.get(category) ?? 0) + 1)
  }
}

/** Broad categories cover most of the set and say little about which icons belong together. */
const maxDiscriminatingUsage = Math.max(1, iconCatalog.length * 0.1)

function isDiscriminating(category: string): boolean {
  return (categoryUsage.get(category) ?? 0) <= maxDiscriminatingUsage
}

/**
 * Ranks icons sharing specific categories, keywords, tags, or aliases with the
 * given icon. Category matches weigh more because they describe broader intent.
 */
export function getRelatedIcons(entry: TIconCatalogEntry, limit = 8): TIconCatalogEntry[] {
  const categories = new Set(entry.categories.filter(isDiscriminating))
  const terms = new Set(
    [...entry.keywords, ...entry.tags, ...entry.aliases].map((term) => term.toLowerCase()),
  )

  return iconCatalog
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
