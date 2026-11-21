/** Metadata declared at the top of a documentation page. */
export interface TDocsFrontmatter {
  /** Page title and sidebar label. */
  title: string
  /** Short summary shown under the title and in metadata. */
  description?: string | undefined
  /** Position among siblings. Pages without one sort last, by title. */
  order?: number | undefined
  /** Name of a Frontier symbol shown beside the title in the sidebar. */
  symbol?: string | undefined
  /** Maturity of what the page documents. */
  status?: 'draft' | 'beta' | 'stable' | undefined
  /** Whether the page appears in the sidebar. Defaults to `true`. */
  sidebar?: boolean | undefined
}

/** A documentation page as the build lists it. */
export interface TDocsPage {
  /** URL path of the page, such as `/docs/components/button`. */
  path: string
  /** Content file, relative to the content directory, such as `components/button/index.mdx`. */
  file: string
  frontmatter: TDocsFrontmatter
}

/** A node of the navigation tree. */
export interface TDocsNavigationNode {
  /** Stable identifier. It is the page path, or `<path>#overview` for an overview leaf. */
  id: string
  label: string
  /** Destination. Folders without a page of their own have none. */
  href?: string | undefined
  symbol?: string | undefined
  status?: TDocsFrontmatter['status']
  children?: TDocsNavigationNode[] | undefined
}

/** One entry of a breadcrumb trail. */
export interface TDocsBreadcrumb {
  label: string
  href: string
}

/** A neighbouring page in reading order. */
export interface TDocsNeighbour {
  label: string
  href: string
}
