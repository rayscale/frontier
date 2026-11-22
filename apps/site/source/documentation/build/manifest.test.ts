import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { pagePathFromFile, parseFrontmatter, scanDocumentationContent } from './manifest.js'

describe('pagePathFromFile', () => {
  it('maps the root page to the documentation root', () => {
    expect(pagePathFromFile('index.mdx')).toBe('/documentation')
  })

  it('maps a nested page folder to its URL', () => {
    expect(pagePathFromFile('components/button/index.mdx')).toBe('/documentation/components/button')
  })

  it('accepts Windows separators', () => {
    expect(pagePathFromFile('components\\button\\index.mdx')).toBe(
      '/documentation/components/button',
    )
  })
})

describe('parseFrontmatter', () => {
  it('reads the declared fields', () => {
    const source =
      '---\ntitle: Button\ndescription: Triggers an action.\norder: 3\nstatus: beta\n---\n\nBody'

    expect(parseFrontmatter(source, 'button/index.mdx')).toEqual({
      title: 'Button',
      description: 'Triggers an action.',
      order: 3,
      status: 'beta',
    })
  })

  it('requires a title and names the file when it is missing', () => {
    expect(() => parseFrontmatter('---\norder: 1\n---\nBody', 'x/index.mdx')).toThrow(
      /x\/index\.mdx.*title/,
    )
  })

  it('requires a frontmatter block', () => {
    expect(() => parseFrontmatter('Body only', 'y/index.mdx')).toThrow(/y\/index\.mdx.*frontmatter/)
  })

  it('rejects an unknown status', () => {
    expect(() => parseFrontmatter('---\ntitle: A\nstatus: odd\n---\n', 'z/index.mdx')).toThrow(
      /status/,
    )
  })
})

describe('scanDocumentationContent', () => {
  let directory = ''

  afterEach(async () => {
    await rm(directory, { force: true, recursive: true })
  })

  async function write(file: string, content: string): Promise<void> {
    const target = join(directory, file)

    await mkdir(join(target, '..'), { recursive: true })
    await writeFile(target, content)
  }

  it('lists every page folder and skips demos and assets', async () => {
    directory = await mkdtemp(join(tmpdir(), 'documentation-'))
    await write('index.mdx', '---\ntitle: Introduction\n---\n')
    await write('components/button/index.mdx', '---\ntitle: Button\n---\n')
    await write('components/button/demos/index.mdx', '---\ntitle: Not a page\n---\n')
    await write('assets/index.mdx', '---\ntitle: Not a page\n---\n')

    const pages = await scanDocumentationContent(directory)

    expect(pages.map((page) => page.path)).toEqual([
      '/documentation',
      '/documentation/components/button',
    ])
    expect(pages[1]).toEqual({
      path: '/documentation/components/button',
      file: 'components/button/index.mdx',
      frontmatter: { title: 'Button' },
    })
  })
})
