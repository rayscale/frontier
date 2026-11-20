import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { parse } from 'yaml'

import type { TDocsFrontmatter, TDocsPage } from '../types.js'

const pageFile = 'index.mdx'
const ignoredFolders = new Set(['assets', 'demos', 'node_modules'])
const statuses = new Set(['draft', 'beta', 'stable'])

/** Maps a content file, relative to the content directory, to its URL path. */
export function pagePathFromFile(file: string): string {
  const segments = file.replaceAll('\\', '/').split('/').slice(0, -1)

  return ['/docs', ...segments].join('/')
}

/** Reads and validates the frontmatter block at the top of a page. */
export function parseFrontmatter(source: string, file: string): TDocsFrontmatter {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)

  if (!match?.[1]) {
    throw new Error(`${file}: the page needs a frontmatter block.`)
  }

  const data: unknown = parse(match[1])

  if (typeof data !== 'object' || data === null) {
    throw new Error(`${file}: the frontmatter must be a mapping.`)
  }

  const record = data as Record<string, unknown>

  if (typeof record.title !== 'string' || record.title === '') {
    throw new Error(`${file}: the frontmatter needs a title.`)
  }

  const frontmatter: TDocsFrontmatter = { title: record.title }

  if (typeof record.description === 'string') {
    frontmatter.description = record.description
  }

  if (typeof record.order === 'number') {
    frontmatter.order = record.order
  }

  if (typeof record.symbol === 'string') {
    frontmatter.symbol = record.symbol
  }

  if (record.status !== undefined) {
    if (typeof record.status !== 'string' || !statuses.has(record.status)) {
      throw new Error(`${file}: the status must be draft, beta, or stable.`)
    }

    frontmatter.status = record.status as NonNullable<TDocsFrontmatter['status']>
  }

  if (typeof record.sidebar === 'boolean') {
    frontmatter.sidebar = record.sidebar
  }

  return frontmatter
}

async function collect(directory: string, prefix: string, pages: TDocsPage[]): Promise<void> {
  const entries = await readdir(directory, { withFileTypes: true })

  for (const entry of entries) {
    const relative = prefix === '' ? entry.name : `${prefix}/${entry.name}`

    if (entry.isDirectory() && !ignoredFolders.has(entry.name) && !entry.name.startsWith('.')) {
      await collect(join(directory, entry.name), relative, pages)
    } else if (entry.isFile() && entry.name === pageFile) {
      const source = await readFile(join(directory, entry.name), 'utf8')

      pages.push({
        path: pagePathFromFile(relative),
        file: relative,
        frontmatter: parseFrontmatter(source, relative),
      })
    }
  }
}

/** Lists the pages under a content directory, sorted by path. */
export async function scanDocsContent(directory: string): Promise<TDocsPage[]> {
  const pages: TDocsPage[] = []

  await collect(directory, '', pages)

  return pages.sort((a, b) => a.path.localeCompare(b.path))
}
