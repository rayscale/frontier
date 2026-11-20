/** Copies text with the Clipboard API, which requires a secure context. */
export async function copyToClipboard(value: string): Promise<void> {
  if (typeof navigator === 'undefined' || typeof navigator.clipboard === 'undefined') {
    throw new Error('Clipboard is not available in this environment.')
  }

  await navigator.clipboard.writeText(value)
}
