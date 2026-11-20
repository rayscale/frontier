declare module 'virtual:docs-manifest' {
  import type { TDocsPage } from '#/docs/types.js'

  const pages: TDocsPage[]

  export default pages
}

declare module '*.mdx' {
  import type { MDXComponents } from 'mdx/types'
  import type { ComponentType } from 'react'

  import type { TDocsFrontmatter } from '#/docs/types.js'

  export const frontmatter: TDocsFrontmatter

  const content: ComponentType<{ components?: MDXComponents }>

  export default content
}
