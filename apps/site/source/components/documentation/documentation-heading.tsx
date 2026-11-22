import type { ComponentPropsWithoutRef, ReactElement } from 'react'

type THeadingLevel = 'h2' | 'h3' | 'h4'

/** Creates a heading that links to its own section when it has an id. */
export function createHeading(Tag: THeadingLevel) {
  return function DocumentationHeading({
    children,
    id,
    ...props
  }: ComponentPropsWithoutRef<THeadingLevel>): ReactElement {
    return (
      <Tag {...props} id={id} className="documentation-heading">
        {children}
        {id ? (
          <a
            className="documentation-heading__anchor"
            href={`#${id}`}
            aria-label="Link to this section"
          >
            #
          </a>
        ) : null}
      </Tag>
    )
  }
}
