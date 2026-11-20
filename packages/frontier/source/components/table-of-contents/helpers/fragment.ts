export function getFragmentId(href: string): string | null {
  if (!href.startsWith('#') || href.length === 1) {
    return null
  }

  try {
    return decodeURIComponent(href.slice(1))
  } catch (error) {
    if (error instanceof URIError) {
      return null
    }

    throw error
  }
}
