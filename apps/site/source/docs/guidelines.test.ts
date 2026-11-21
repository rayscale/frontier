import { describe, expect, it } from 'vitest'

import {
  guidelineDescription,
  guidelineRoute,
  guidelineTitle,
  indexOrder,
  remarkGuideline,
  rewriteGuidelineLink,
} from './guidelines.js'

describe('guidelines', () => {
  describe('title and description', () => {
    const source = `# Colors

Color in Frontier communicates **roles**. It tells the user [what](./x.md) a surface is for.

## Roles
`

    it('takes the title from the first heading', () => {
      expect(guidelineTitle(source)).toBe('Colors')
    })

    it('takes the first sentence after the title as plain text', () => {
      expect(guidelineDescription(source)).toBe('Color in Frontier communicates roles.')
    })

    it('skips lists and headings when it looks for the first paragraph', () => {
      expect(
        guidelineDescription('# Title\n\n- an item\n\n## Heading\n\nThe real paragraph.'),
      ).toBe('The real paragraph.')
      expect(guidelineDescription('# Title\n')).toBeUndefined()
    })
  })

  describe('order', () => {
    it('numbers the links of an index in the order they are listed', () => {
      const index = `# Principles

- [Clarity](./clarity.md): first.
- [Restraint](./restraint.md): second.

A sentence with a [link](./other.md) that is not an item.
`

      expect([...indexOrder(index)]).toEqual([
        ['clarity.md', 0],
        ['restraint.md', 1],
      ])
    })
  })

  describe('routes', () => {
    it('maps a file to its page, and an index to its folder', () => {
      expect(guidelineRoute('README.md')).toBe('/docs/guidelines')
      expect(guidelineRoute('foundations/README.md')).toBe('/docs/guidelines/foundations')
      expect(guidelineRoute('foundations/colors.md')).toBe('/docs/guidelines/foundations/colors')
    })

    it('points a link between guidelines to the page', () => {
      expect(rewriteGuidelineLink('./choice.md', 'components/action.md')).toBe(
        '/docs/guidelines/components/choice',
      )
      expect(rewriteGuidelineLink('../patterns/drag.md#keyboard', 'components/toggle.md')).toBe(
        '/docs/guidelines/patterns/drag#keyboard',
      )
      expect(rewriteGuidelineLink('./principles/README.md', 'README.md')).toBe(
        '/docs/guidelines/principles',
      )
    })

    it('leaves other links as they are', () => {
      expect(rewriteGuidelineLink('https://example.com/a.md', 'a/b.md')).toBe(
        'https://example.com/a.md',
      )
      expect(rewriteGuidelineLink('#roles', 'a/b.md')).toBe('#roles')
      expect(rewriteGuidelineLink('./image.png', 'a/b.md')).toBe('./image.png')
      expect(rewriteGuidelineLink('../../outside.md', 'a/b.md')).toBe('../../outside.md')
    })
  })

  describe('page preparation', () => {
    it('removes the title, demotes a later top-level heading, and rewrites nested links', () => {
      const link = { type: 'link', url: './choice.md', children: [{ type: 'text' }] }
      const tree = {
        type: 'root',
        children: [
          { type: 'heading', depth: 1, children: [{ type: 'text' }] },
          { type: 'heading', depth: 1, children: [{ type: 'text' }] },
          { type: 'paragraph', children: [link] },
        ],
      }

      remarkGuideline({ file: 'components/action.md' })(tree)

      expect(tree.children.map((node) => `${node.type}:${String(node.depth)}`)).toEqual([
        'heading:2',
        'paragraph:undefined',
      ])
      expect(link.url).toBe('/docs/guidelines/components/choice')
    })
  })
})
