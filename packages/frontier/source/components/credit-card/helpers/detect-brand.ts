import type { TCreditCardBrand } from '../types.js'

function startsWithRange(digits: string, length: number, from: number, to: number): boolean {
  const prefix = Number(digits.slice(0, length))
  return digits.length >= length && prefix >= from && prefix <= to
}

/**
 * Reads the card network from the leading digits of a card number. Returns
 * `generic` when the number is too short or belongs to no supported network.
 */
export function detectCreditCardBrand(number: string): TCreditCardBrand {
  const digits = number.replace(/\D/g, '')

  if (digits.startsWith('4')) return 'visa'
  if (
    ['5018', '5020', '5038', '6304', '6759', '6761', '6762', '6763'].some((prefix) =>
      digits.startsWith(prefix),
    )
  ) {
    return 'maestro'
  }

  if (startsWithRange(digits, 2, 36, 36) || startsWithRange(digits, 2, 38, 38)) return 'diners'
  if (startsWithRange(digits, 3, 300, 305)) return 'diners'
  if (startsWithRange(digits, 2, 51, 55) || startsWithRange(digits, 4, 2221, 2720)) {
    return 'mastercard'
  }

  if (startsWithRange(digits, 2, 34, 34) || startsWithRange(digits, 2, 37, 37)) return 'amex'
  if (startsWithRange(digits, 4, 3528, 3589)) return 'jcb'
  if (digits.startsWith('62')) return 'unionpay'
  if (
    digits.startsWith('6011') ||
    digits.startsWith('65') ||
    startsWithRange(digits, 3, 644, 649)
  ) {
    return 'discover'
  }

  return 'generic'
}
