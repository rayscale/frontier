/** The key under which the visitor's theme choice is remembered. */
export const themeStorageKey = 'frontier-theme'

/**
 * Runs in the document head, before the first paint, so a remembered or system dark theme does not
 * flash light. It mirrors how `ThemeProvider` resolves the preference.
 */
export const themeScript = `(function () {
  try {
    var stored = window.localStorage.getItem('${themeStorageKey}');
    var dark = stored === 'dark' || ((stored !== 'light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  } catch (error) {}
})();`
