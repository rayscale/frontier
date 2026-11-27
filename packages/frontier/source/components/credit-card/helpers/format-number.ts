import type { TCreditCardBrand } from '../types.js'

const maskCharacter = '•'
const visibleDigits = 4

/** Returns the last digits of a card number, the only part safe to announce. */
export function getLastDigits(number: string): string {
  return number.replace(/\s+/g, '').slice(-visibleDigits)
}

/** Groups a card number for the network and hides all but the last digits when `masked`. */
export function formatCardNumber(number: string, brand: TCreditCardBrand, masked: boolean): string {
  const compact = number.replace(/\s+/g, '')
  const firstVisible = compact.length - visibleDigits
  const shown = masked
    ? Array.from(compact, (character, index) => (index < firstVisible ? maskCharacter : character))
    : Array.from(compact)
  const groups = brand === 'amex' ? [4, 6, 5] : [4]
  const parts: string[] = []
  let start = 0

  while (start < shown.length) {
    const size = groups[Math.min(parts.length, groups.length - 1)] ?? 4
    parts.push(shown.slice(start, start + size).join(''))
    start += size
  }

  return parts.join(' ')
}
