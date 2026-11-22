import { readFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'

import { evaluate } from '@mdx-js/mdx'
import type { MDXComponents } from 'mdx/types'
import type { ComponentType } from 'react'
import * as runtime from 'react/jsx-runtime'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'

import { remarkGuideline } from './guidelines.js'
import { contentDirectory, guidelinesDirectory } from './pages.js'
import type { TDocumentationPage } from './types.js'

type TContent = ComponentType<{ components?: MDXComponents }>

/**
 * Compiles a page into a component. A page of the content is MDX. A guideline is plain Markdown,
 * so it is read as Markdown and prepared to be a page. Runs on the server while the site is built.
 */
export async function compilePage(page: TDocumentationPage): Promise<TContent> {
  const path = join(contentDirectory, page.file)
  const source = await readFile(path, 'utf8')
  const guideline = page.file.endsWith('.md')
  const { default: content } = await evaluate(source, {
    ...runtime,
    ...(guideline ? { format: 'md' as const } : {}),
    remarkPlugins: guideline
      ? [
          remarkGfm,
          [remarkGuideline, { file: relative(guidelinesDirectory, path).split(sep).join('/') }],
        ]
      : [remarkFrontmatter, remarkGfm],
    rehypePlugins: [rehypeSlug],
  })

  return content
}
