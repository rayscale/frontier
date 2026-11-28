/** The style that decides where the text of a field breaks and how big each letter is. */
const mirroredProperties = [
  'boxSizing',
  'width',
  'overflowX',
  'overflowY',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',
  'textAlign',
  'textTransform',
  'textIndent',
  'letterSpacing',
  'wordSpacing',
  'tabSize',
  'direction',
] as const

/**
 * Measures where a character of a text field is on the screen. A text field does not say where its
 * letters are, so this builds a copy of it, off screen, with the same style and the text up to the
 * character, and reads where the end of that text lands.
 */
export function getCaretRect(
  field: HTMLInputElement | HTMLTextAreaElement,
  index: number,
): DOMRect {
  const style = getComputedStyle(field)
  const mirror = document.createElement('div')
  const multiline = field instanceof HTMLTextAreaElement

  for (const property of mirroredProperties) {
    mirror.style[property] = style[property]
  }

  mirror.style.position = 'absolute'
  mirror.style.visibility = 'hidden'
  mirror.style.top = '0'
  mirror.style.left = '-9999px'
  mirror.style.whiteSpace = multiline ? 'pre-wrap' : 'pre'
  mirror.style.overflowWrap = 'break-word'
  mirror.style.height = 'auto'
  mirror.textContent = field.value.slice(0, index)

  const marker = document.createElement('span')
  marker.textContent = field.value.slice(index) || '.'
  mirror.append(marker)
  document.body.append(mirror)

  const lineHeight = Number.parseFloat(style.lineHeight)
  const height = Number.isNaN(lineHeight) ? Number.parseFloat(style.fontSize) * 1.2 : lineHeight
  const box = field.getBoundingClientRect()
  const left =
    box.left + Number.parseFloat(style.borderLeftWidth) + marker.offsetLeft - field.scrollLeft
  const top = box.top + Number.parseFloat(style.borderTopWidth) + marker.offsetTop - field.scrollTop

  mirror.remove()

  return new DOMRect(left, top, 0, height)
}
