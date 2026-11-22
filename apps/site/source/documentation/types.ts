/** Metadata declared at the top of a documentation page. */
export interface TDocumentationFrontmatter {
  /** Page title and sidebar label. */
  title: string
  /** Short summary shown under the title and in metadata. */
  description?: string | undefined
  /** Position among siblings. Pages without one sort last, by title. */
  order?: number | undefined
  /** Name of a Frontier icon shown beside the title in the sidebar. */
  icon?: string | undefined
  /** Maturity of what the page documents. */
  status?: 'draft' | 'beta' | 'stable' | undefined
  /** Whether the page appears in the sidebar. Defaults to `true`. */
  sidebar?: boolean | undefined
}

/** A documentation page as the build lists it. */
export interface TDocumentationPage {
  /** URL path of the page, such as `/documentation/components/button`. */
  path: string
  /** Content file, relative to the content directory, such as `components/button/index.mdx`. */
  file: string
  frontmatter: TDocumentationFrontmatter
}

/** A node of the navigation tree. */
export interface TDocumentationNavigationNode {
  /** Stable identifier. It is the page path, or `<path>#overview` for an overview leaf. */
  id: string
  label: string
  /** Destination. Folders without a page of their own have none. */
  href?: string | undefined
  icon?: string | undefined
  status?: TDocumentationFrontmatter['status']
  children?: TDocumentationNavigationNode[] | undefined
}

/** One entry of a breadcrumb trail. */
export interface TDocumentationBreadcrumb {
  label: string
  href: string
}

/** A neighbouring page in reading order. */
export interface TDocumentationNeighbour {
  label: string
  href: string
}
