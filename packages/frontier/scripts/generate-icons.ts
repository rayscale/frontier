import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { XMLParser } from 'fast-xml-parser'

import type { TIconAttributes, TIconNode } from '../source/icons/types.js'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const iconsRoot = join(packageRoot, 'source', 'icons')
const svgRoot = join(iconsRoot, 'svg')
const componentsRoot = join(iconsRoot, 'components')
const barrelPath = join(iconsRoot, 'generated.ts')
const metadataPath = join(iconsRoot, 'metadata.generated.ts')

const supportedElements = new Set([
  'circle',
  'ellipse',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
])
const requiredMetadata = ['aliases', 'categories', 'keywords', 'name', 'useCases'] as const

interface TIconSource {
  attributes: TIconAttributes
  tag: string
}

interface TMetadataFields {
  [field: string]: unknown
}

interface TPreparedIcon {
  component: string
  description: string
  metadata: TMetadataFields
  name: string
  nodes: TIconNode
}

const xmlParser = new XMLParser({
  allowBooleanAttributes: true,
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
})

function isRecord(value: unknown): value is TMetadataFields {
  return typeof value === 'object' && value !== null
}

function toPascalCase(name: string): string {
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : []
}

function readJson(filePath: string): unknown {
  try {
    return JSON.parse(readFileSync(filePath, 'utf8')) as unknown
  } catch (error) {
    throw new Error(`Invalid JSON in ${filePath}.`, { cause: error })
  }
}

function validateMetadata(name: string, metadata: unknown, filePath: string): TMetadataFields {
  if (!isRecord(metadata)) {
    throw new Error(`Metadata for "${name}" must be an object (${filePath}).`)
  }

  for (const key of requiredMetadata) {
    if (!(key in metadata)) {
      throw new Error(`Metadata for "${name}" is missing "${key}" (${filePath}).`)
    }
  }

  if (metadata.name !== name) {
    throw new Error(
      `Metadata name mismatch for "${name}" (${filePath}): expected "${name}", got "${String(metadata.name)}".`,
    )
  }

  if (toStringArray(metadata.keywords).length === 0) {
    throw new Error(`Metadata for "${name}" needs at least one keyword (${filePath}).`)
  }

  return metadata
}

function toAttributeValue(value: unknown): string | number {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value)
  }

  return String(value)
}

function toAttributeName(name: string): string {
  return name === 'class'
    ? 'className'
    : name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
}

function parseSvg(name: string, filePath: string, svg: string): TIconNode {
  const document: unknown = xmlParser.parse(svg)

  if (!isRecord(document) || !isRecord(document.svg)) {
    throw new Error(`Missing root <svg> in icon "${name}" (${filePath}).`)
  }

  const sources: TIconSource[] = []

  for (const [key, value] of Object.entries(document.svg)) {
    if (key.startsWith('@_')) {
      continue
    }

    const tag = key.toLowerCase()

    if (!supportedElements.has(tag)) {
      throw new Error(`Unsupported SVG element "${tag}" in icon "${name}" (${filePath}).`)
    }

    for (const entry of Array.isArray(value) ? value : [value]) {
      if (!isRecord(entry)) {
        throw new Error(`Unsupported SVG child in icon "${name}" (${filePath}).`)
      }

      const attributes: TIconAttributes = {}

      for (const [attribute, rawValue] of Object.entries(entry)) {
        if (!attribute.startsWith('@_')) {
          throw new Error(`Nested elements are not supported in icon "${name}" (${filePath}).`)
        }

        attributes[toAttributeName(attribute.slice(2))] = toAttributeValue(rawValue)
      }

      if (Object.keys(attributes).length === 0) {
        throw new Error(`SVG element "${tag}" in icon "${name}" (${filePath}) has no attributes.`)
      }

      sources.push({ attributes, tag })
    }
  }

  if (sources.length === 0) {
    throw new Error(`No SVG elements found in icon "${name}" (${filePath}).`)
  }

  return sources.map(({ attributes, tag }) => [tag, attributes] as const)
}

function describeIcon(component: string, metadata: TMetadataFields): string {
  const description = typeof metadata.description === 'string' ? metadata.description.trim() : ''

  return (description || `${component} icon.`).replace(/\*\//g, '*\\/')
}

function generateComponent({ component, description, nodes }: TPreparedIcon): string {
  const nodeLiteral = nodes
    .map(([tag, attributes]) => `  [${JSON.stringify(tag)}, ${JSON.stringify(attributes)}],`)
    .join('\n')

  return `import { createIcon } from '../../create-icon.js'
import type { TIconNode } from '../../types.js'

const iconNode: TIconNode = [
${nodeLiteral}
]

/**
 * ${description}
 */
export const ${component} = createIcon({ name: '${component}', iconNode })
`
}

function generateBarrel(prepared: readonly TPreparedIcon[]): string {
  return `${[...prepared]
    .sort((first, second) => first.name.localeCompare(second.name))
    .map(({ name }) => `export * from './components/${name}/index.js'`)
    .join('\n')}\n`
}

function generateMetadata(prepared: readonly TPreparedIcon[]): string {
  const entries = [...prepared]
    .sort((first, second) => first.name.localeCompare(second.name))
    .map(({ component, description, metadata, name }) => ({
      aliases: toStringArray(metadata.aliases),
      categories: toStringArray(metadata.categories),
      component,
      contributors: toStringArray(metadata.contributors),
      description,
      keywords: toStringArray(metadata.keywords),
      name,
      tags: toStringArray(metadata.tags),
      useCases: toStringArray(metadata.useCases),
    }))

  return `// This file is generated by scripts/generate-icons.ts.
// Run \`pnpm --filter @rayscale/frontier generate:icons\` after changing icon sources.

import type { TIconMetadata } from './types.js'

export const iconMetadata: TIconMetadata[] = ${JSON.stringify(entries, null, 2)}

export const iconMetadataByName: { [name: string]: TIconMetadata } = Object.fromEntries(
  iconMetadata.map((icon) => [icon.name, icon]),
)
`
}

function writeFileIfChanged(filePath: string, content: string): void {
  if (existsSync(filePath) && readFileSync(filePath, 'utf8') === content) {
    return
  }

  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, content, 'utf8')
}

function main(): void {
  if (!existsSync(svgRoot)) {
    throw new Error(`Missing icon source directory: ${svgRoot}`)
  }

  const names = readdirSync(svgRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()

  const prepared = names.map((name): TPreparedIcon => {
    const sourceDir = join(svgRoot, name)
    const svgPath = join(sourceDir, 'icon.svg')
    const metadataFilePath = join(sourceDir, 'icon.json')

    if (!existsSync(svgPath) || !existsSync(metadataFilePath)) {
      throw new Error(`Icon "${name}" needs both icon.svg and icon.json (${sourceDir}).`)
    }

    const component = toPascalCase(name)
    const metadata = validateMetadata(name, readJson(metadataFilePath), metadataFilePath)
    const nodes = parseSvg(name, svgPath, readFileSync(svgPath, 'utf8'))

    return { component, description: describeIcon(component, metadata), metadata, name, nodes }
  })

  rmSync(componentsRoot, { force: true, recursive: true })

  const componentNames = new Set<string>()

  for (const icon of prepared) {
    if (componentNames.has(icon.component)) {
      throw new Error(`Duplicate icon component "${icon.component}".`)
    }

    componentNames.add(icon.component)
    writeFileIfChanged(join(componentsRoot, icon.name, `${icon.name}.tsx`), generateComponent(icon))
    writeFileIfChanged(
      join(componentsRoot, icon.name, 'index.ts'),
      `export { ${icon.component} } from './${icon.name}.js'\n`,
    )
  }

  writeFileIfChanged(barrelPath, generateBarrel(prepared))
  writeFileIfChanged(metadataPath, generateMetadata(prepared))
}

main()
