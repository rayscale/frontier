import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { evaluate } from '@mdx-js/mdx'
import type { MDXComponents } from 'mdx/types'
import type { ComponentType } from 'react'
import * as runtime from 'react/jsx-runtime'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'

import { contentDirectory } from './pages.js'
import type { TDocsPage } from './types.js'

type TContent = ComponentType<{ components?: MDXComponents }>

/** Compiles the MDX of a page into a component. Runs on the server while the site is built. */
export async function compilePage(page: TDocsPage): Promise<TContent> {
  const source = await readFile(join(contentDirectory, page.file), 'utf8')
  const { default: content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [rehypeSlug],
  })

  return content
}
