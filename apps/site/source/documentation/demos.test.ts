import { describe, expect, it } from 'vitest'

import { demoLocation, toKebabCase } from './demos.js'
import type { TDocumentationPage } from './types.js'

function page(file: string): TDocumentationPage {
  return { path: '/documentation/x', file, frontmatter: { title: 'X' } }
}

describe('toKebabCase', () => {
  it('turns a camelCase demo name into its file name', () => {
    expect(toKebabCase('withIcon')).toBe('with-icon')
    expect(toKebabCase('longText')).toBe('long-text')
  })

  it('leaves a single word alone', () => {
    expect(toKebabCase('variants')).toBe('variants')
  })
})

describe('demoLocation', () => {
  it('points at the demos folder next to the page', () => {
    expect(demoLocation(page('components/button/index.mdx'), 'withIcon')).toEqual({
      directory: 'components/button',
      file: 'with-icon.tsx',
    })
  })

  it('has no folder for the root page', () => {
    expect(demoLocation(page('index.mdx'), 'hello').directory).toBe('')
  })
})
