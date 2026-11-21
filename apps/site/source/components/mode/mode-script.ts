/** The key under which the visitor's mode choice is remembered. */
export const modeStorageKey = 'frontier-mode'

/**
 * Runs in the document head, before the first paint, so a remembered or system dark mode does not
 * flash light. It mirrors how `ModeProvider` resolves the preference.
 */
export const modeScript = `(function () {
  try {
    var stored = window.localStorage.getItem('${modeStorageKey}');
    var dark = stored === 'dark' || ((stored !== 'light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.mode = dark ? 'dark' : 'light';
  } catch (error) {}
})();`
