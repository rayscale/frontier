import { describe, expect, it } from 'vitest'

import { themePages } from './themes.js'

describe('themePages', () => {
  it('makes a page for each theme, in the order of the package', () => {
    const pages = themePages([
      { name: 'frontier', title: 'Frontier', description: 'The default theme.' },
      { name: 'bisnes', title: 'Bisnes', description: 'A test theme.' },
    ])

    expect(pages.map((page) => page.path)).toEqual(['/docs/themes/frontier', '/docs/themes/bisnes'])
    expect(pages.map((page) => page.frontmatter.order)).toEqual([20, 21])
    expect(pages[1]).toMatchObject({
      frontmatter: { title: 'Bisnes', description: 'A test theme.' },
      source: '<ThemePage name="bisnes" />',
    })
  })

  it('rejects a name that is not kebab-case, because it becomes part of the page source', () => {
    expect(() => themePages([{ name: 'a" /><Evil', title: 'Evil', description: 'Evil.' }])).toThrow(
      'must be kebab-case',
    )
  })
})
