import { themeMetadata } from '@rayscale/frontier/theme-metadata'

/** The theme that applies when no other is chosen. It is the base, so it has no stylesheet. */
export const defaultTheme = 'frontier'

/** The key under which the visitor's theme choice is remembered. */
export const themeStorageKey = 'frontier-theme'

/** The names of the themes of the package. */
export const themeNames: readonly string[] = themeMetadata.map((theme) => theme.name)

/**
 * Runs in the document head, before the first paint, so a remembered theme does not flash the
 * default one. It only accepts a name that the package has. It mirrors how `ThemeProvider` applies
 * the choice.
 */
export const themeScript = `(function () {
  try {
    var themes = ${JSON.stringify(themeNames)};
    var stored = window.localStorage.getItem('${themeStorageKey}');
    if (stored && stored !== '${defaultTheme}' && themes.indexOf(stored) !== -1) {
      document.documentElement.dataset.theme = stored;
    }
  } catch (error) {}
})();`
