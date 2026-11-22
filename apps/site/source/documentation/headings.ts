/** A heading of the page that the table of contents can link to. */
export interface THeading {
  id: string
  label: string
  level: 2 | 3
}

/** A second level heading with the third level headings that follow it. */
export interface THeadingBranch extends THeading {
  children: THeading[]
}

const anchorSelector = '.documentation-heading__anchor'

/** Lists the second and third level headings that have an id. */
export function collectHeadings(root: ParentNode): THeading[] {
  const headings: THeading[] = []

  for (const element of root.querySelectorAll('h2[id], h3[id]')) {
    const clone = element.cloneNode(true)

    if (!(clone instanceof Element)) {
      continue
    }

    clone.querySelector(anchorSelector)?.remove()

    headings.push({
      id: element.id,
      label: clone.textContent.trim(),
      level: element.tagName === 'H2' ? 2 : 3,
    })
  }

  return headings
}

/** Nests each third level heading under the second level heading before it. */
export function nestHeadings(headings: THeading[]): THeadingBranch[] {
  const branches: THeadingBranch[] = []

  for (const heading of headings) {
    const last = branches.at(-1)

    if (heading.level === 3 && last?.level === 2) {
      last.children.push(heading)
    } else {
      branches.push({ ...heading, children: [] })
    }
  }

  return branches
}
