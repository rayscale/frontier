import type { ComponentType } from 'react'

import type { TDocsPage } from './types.js'

const demoLoaders = import.meta.glob<{ default: ComponentType }>('/content/**/demos/*.tsx')
const sourceLoaders = import.meta.glob<string>('/content/**/demos/*.tsx', {
  query: '?raw',
  import: 'default',
})

/** Turns a camelCase demo name, as written in a page, into its file name. */
export function toKebabCase(name: string): string {
  return name.replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/** Resolves the module path of a demo that sits in the `demos` folder next to a page. */
export function demoModulePath(page: TDocsPage, name: string): string {
  const directory = page.file.split('/').slice(0, -1).join('/')
  const base = directory === '' ? '/content' : `/content/${directory}`

  return `${base}/demos/${toKebabCase(name)}.tsx`
}

/** Loads the component of a demo, or throws when the page has no demo with that name. */
export async function loadDemo(page: TDocsPage, name: string): Promise<ComponentType> {
  const path = demoModulePath(page, name)
  const load = demoLoaders[path]

  if (!load) {
    throw new Error(`${page.file}: there is no demo named "${name}" (expected ${path}).`)
  }

  return (await load()).default
}

/** Loads the source text of a demo for the code tab. */
export async function loadDemoSource(page: TDocsPage, name: string): Promise<string> {
  const path = demoModulePath(page, name)
  const load = sourceLoaders[path]

  if (!load) {
    throw new Error(`${page.file}: there is no demo named "${name}" (expected ${path}).`)
  }

  return load()
}
