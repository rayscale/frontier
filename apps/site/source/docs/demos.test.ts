import { describe, expect, it } from 'vitest'

import { demoModulePath, toKebabCase } from './demos.js'
import type { TDocsPage } from './types.js'

function page(file: string): TDocsPage {
  return { path: '/docs/x', file, frontmatter: { title: 'X' } }
}

describe('toKebabCase', () => {
  it('turns a camelCase demo name into its file name', () => {
    expect(toKebabCase('withSymbol')).toBe('with-symbol')
    expect(toKebabCase('longText')).toBe('long-text')
  })

  it('leaves a single word alone', () => {
    expect(toKebabCase('variants')).toBe('variants')
  })
})

describe('demoModulePath', () => {
  it('points at the demos folder next to the page', () => {
    expect(demoModulePath(page('components/button/index.mdx'), 'withSymbol')).toBe(
      '/content/components/button/demos/with-symbol.tsx',
    )
  })

  it('resolves demos of the root page', () => {
    expect(demoModulePath(page('index.mdx'), 'hello')).toBe('/content/demos/hello.tsx')
  })
})
