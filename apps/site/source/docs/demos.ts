import type { TDocsPage } from './types.js'

/** Turns a camelCase demo name, as written in a page, into its file name. */
export function toKebabCase(name: string): string {
  return name.replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/** Where a demo lives: the folder of its page, relative to the content directory, and its file. */
export function demoLocation(page: TDocsPage, name: string): { directory: string; file: string } {
  const directory = page.file.split('/').slice(0, -1).join('/')

  return { directory, file: `${toKebabCase(name)}.tsx` }
}
