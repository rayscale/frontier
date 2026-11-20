import { describe, expect, it } from 'vitest'

import { collectHeadings, nestHeadings } from './headings.js'

function root(html: string): HTMLElement {
  const element = document.createElement('div')

  element.innerHTML = html

  return element
}

describe('collectHeadings', () => {
  it('lists the second and third level headings that have an id', () => {
    const headings = collectHeadings(
      root(
        '<h1 id="t">Title</h1><h2 id="a">A</h2><h3 id="b">B</h3><h4 id="c">C</h4><h2>No id</h2>',
      ),
    )

    expect(headings).toEqual([
      { id: 'a', label: 'A', level: 2 },
      { id: 'b', label: 'B', level: 3 },
    ])
  })

  it('uses the heading text without the anchor link text', () => {
    const headings = collectHeadings(
      root(
        '<h2 id="a">Usage<a class="docs-heading__anchor" href="#a" aria-label="Link">#</a></h2>',
      ),
    )

    expect(headings[0]?.label).toBe('Usage')
  })
})

describe('nestHeadings', () => {
  it('places third level headings under the second level heading before them', () => {
    const nested = nestHeadings([
      { id: 'a', label: 'A', level: 2 },
      { id: 'a1', label: 'A1', level: 3 },
      { id: 'a2', label: 'A2', level: 3 },
      { id: 'b', label: 'B', level: 2 },
    ])

    expect(nested).toEqual([
      {
        id: 'a',
        label: 'A',
        level: 2,
        children: [
          { id: 'a1', label: 'A1', level: 3 },
          { id: 'a2', label: 'A2', level: 3 },
        ],
      },
      { id: 'b', label: 'B', level: 2, children: [] },
    ])
  })

  it('keeps a third level heading with no parent at the top level', () => {
    const nested = nestHeadings([{ id: 'x', label: 'X', level: 3 }])

    expect(nested).toEqual([{ id: 'x', label: 'X', level: 3, children: [] }])
  })
})
