import { readdir, readFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'

import { guidelineDescription, guidelineRoute, guidelineTitle, indexOrder } from '../guidelines.js'
import type { TDocumentationFrontmatter, TDocumentationPage } from '../types.js'

/** Files of the guidelines folder that are instructions for agents, not guidelines. */
const ignoredFiles = new Set(['AGENTS.md', 'CLAUDE.md'])

const rootFile = 'README.md'
const rootTitle = 'Guidelines'
const rootIcon = 'book'
const rootOrder = 50

async function listGuidelines(directory: string, prefix = ''): Promise<string[]> {
  const entries = await readdir(join(directory, prefix), { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const file = prefix === '' ? entry.name : `${prefix}/${entry.name}`

      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        return listGuidelines(directory, file)
      }

      return entry.isFile() && entry.name.endsWith('.md') && !ignoredFiles.has(entry.name)
        ? [file]
        : []
    }),
  )

  return nested.flat()
}

/** Where a guideline comes among its siblings, as the index that lists it gives it. */
function orderOf(
  file: string,
  sources: ReadonlyMap<string, string>,
  rootIndex: ReadonlyMap<string, number>,
): number | undefined {
  if (file === rootFile) {
    return rootOrder
  }

  const segments = file.split('/')
  const name = segments.at(-1) ?? file

  if (name === rootFile) {
    return rootIndex.get(file)
  }

  const folder = segments.slice(0, -1).join('/')

  return indexOrder(sources.get(`${folder}/${rootFile}`) ?? '').get(name)
}

/**
 * Lists the guidelines as pages of the documentation. A guideline needs no frontmatter: its title,
 * its description, and its place come from the guideline and from the index that lists it. The file
 * of a page is relative to the content directory, like the file of any other page.
 */
export async function scanGuidelines(
  directory: string,
  contentDirectory: string,
): Promise<TDocumentationPage[]> {
  const files = await listGuidelines(directory)
  const sources = new Map(
    await Promise.all(
      files.map(async (file) => [file, await readFile(join(directory, file), 'utf8')] as const),
    ),
  )
  const rootIndex = indexOrder(sources.get(rootFile) ?? '')

  return files
    .map((file): TDocumentationPage => {
      const source = sources.get(file) ?? ''
      const name = file.split('/').at(-1) ?? file
      const order = orderOf(file, sources, rootIndex)
      const description = guidelineDescription(source)
      const frontmatter: TDocumentationFrontmatter = {
        title:
          file === rootFile ? rootTitle : (guidelineTitle(source) ?? name.replace(/\.md$/, '')),
      }

      if (description !== undefined) {
        frontmatter.description = description
      }

      if (order !== undefined) {
        frontmatter.order = order
      }

      if (file === rootFile) {
        frontmatter.icon = rootIcon
      }

      return {
        path: guidelineRoute(file),
        file: relative(contentDirectory, join(directory, file)).split(sep).join('/'),
        frontmatter,
      }
    })
    .sort((a, b) => a.path.localeCompare(b.path))
}
