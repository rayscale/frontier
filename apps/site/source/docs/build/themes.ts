import type { TDocsPage } from '../types.js'

/** The URL path of the themes section of the documentation. */
export const themesPath = '/docs/themes'

/** Where the pages of the themes start among the pages of their section. */
const firstOrder = 20

const namePattern = /^[a-z][a-z\d-]*$/

/**
 * One page for each theme of the package, so a theme that the package adds appears in the
 * documentation by itself. The page shows the theme from its metadata, and it has no file.
 */
export function themePages(
  themes: readonly { name: string; title: string; description: string }[],
): TDocsPage[] {
  return themes.map((theme, index) => {
    if (!namePattern.test(theme.name)) {
      throw new Error(`The theme name "${theme.name}" must be kebab-case.`)
    }

    return {
      path: `${themesPath}/${theme.name}`,
      file: `themes/${theme.name}/index.mdx`,
      frontmatter: {
        title: theme.title,
        description: theme.description,
        order: firstOrder + index,
      },
      source: `<ThemePage name="${theme.name}" />`,
    }
  })
}
