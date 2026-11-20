import type { ComponentPropsWithoutRef, ReactElement } from 'react'

type THeadingLevel = 'h2' | 'h3' | 'h4'

/** Creates a heading that links to its own section when it has an id. */
export function createHeading(Tag: THeadingLevel) {
  return function DocsHeading({
    children,
    id,
    ...props
  }: ComponentPropsWithoutRef<THeadingLevel>): ReactElement {
    return (
      <Tag {...props} id={id} className="docs-heading">
        {children}
        {id ? (
          <a className="docs-heading__anchor" href={`#${id}`} aria-label="Link to this section">
            #
          </a>
        ) : null}
      </Tag>
    )
  }
}
