import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { scanGuidelines } from './guidelines.js'

let directory = ''

async function write(file: string, content: string): Promise<void> {
  await mkdir(join(directory, file, '..'), { recursive: true })
  await writeFile(join(directory, file), content)
}

describe('scanGuidelines', () => {
  beforeEach(async () => {
    directory = await mkdtemp(join(tmpdir(), 'guidelines-'))
    await write(
      'README.md',
      '# Frontier Design Guidelines\n\nThe guidelines are one system. They have layers.\n\n- [Principles](./principles/README.md) are the values.\n',
    )
    await write(
      'principles/README.md',
      '# Principles\n\nValues behind decisions.\n\n- [Restraint](./restraint.md): less.\n- [Clarity](./clarity.md): more.\n',
    )
    await write('principles/clarity.md', '# Clarity\n\nClarity comes first.\n')
    await write('principles/restraint.md', '# Restraint\n\nRestraint governs the amount.\n')
    await write('AGENTS.md', '# Instructions for agents\n')
  })

  afterEach(async () => {
    await rm(directory, { force: true, recursive: true })
  })

  it('lists every guideline as a page, and leaves out the files for agents', async () => {
    const pages = await scanGuidelines(directory, join(directory, 'content'))

    expect(pages.map((page) => page.path)).toEqual([
      '/docs/guidelines',
      '/docs/guidelines/principles',
      '/docs/guidelines/principles/clarity',
      '/docs/guidelines/principles/restraint',
    ])
  })

  it('derives the frontmatter from the guideline and from the index that lists it', async () => {
    const pages = await scanGuidelines(directory, join(directory, 'content'))
    const byPath = new Map(pages.map((page) => [page.path, page.frontmatter]))

    expect(byPath.get('/docs/guidelines')).toEqual({
      title: 'Guidelines',
      description: 'The guidelines are one system.',
      order: 50,
      symbol: 'book',
    })
    expect(byPath.get('/docs/guidelines/principles')).toEqual({
      title: 'Principles',
      description: 'Values behind decisions.',
      order: 0,
    })
    expect(byPath.get('/docs/guidelines/principles/restraint')).toMatchObject({ order: 0 })
    expect(byPath.get('/docs/guidelines/principles/clarity')).toMatchObject({ order: 1 })
  })

  it('points the file of a page at the guideline, relative to the content directory', async () => {
    const contentDirectory = join(directory, 'content')
    const pages = await scanGuidelines(directory, contentDirectory)
    const clarity = pages.find((page) => page.path.endsWith('/clarity'))

    expect(clarity?.file).toBe(
      relative(contentDirectory, join(directory, 'principles', 'clarity.md')).replaceAll('\\', '/'),
    )
  })
})
