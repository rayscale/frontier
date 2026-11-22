import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { toKebabCase } from './demos.js'

const root = join(process.cwd(), '../..')
const componentsSource = join(root, 'packages/frontier/source/components')
const componentsContent = join(root, 'apps/site/documentation/content/components')

function directories(path: string): string[] {
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

function documentedPages(): Map<string, string> {
  const pages = new Map<string, string>()
  for (const category of directories(componentsContent)) {
    for (const component of directories(join(componentsContent, category))) {
      pages.set(component, join(componentsContent, category, component))
    }
  }

  return pages
}

describe('component documentation', () => {
  const pages = documentedPages()
  const components = directories(componentsSource)

  it.each(components)('documents %s', (component) => {
    const directory = pages.get(component)
    expect(directory, `missing a page for ${component}`).toBeDefined()
    expect(existsSync(join(directory ?? '', 'index.mdx'))).toBe(true)
  })

  it.each([...pages.entries()])('has a demo file for each demo of %s', (_name, directory) => {
    const source = readFileSync(join(directory, 'index.mdx'), 'utf8')
    const names = [...source.matchAll(/<Demo name="([^"]+)"/g)].map((match) => match[1] ?? '')
    for (const name of names) {
      expect(existsSync(join(directory, 'demos', `${toKebabCase(name)}.tsx`))).toBe(true)
    }
  })
})
