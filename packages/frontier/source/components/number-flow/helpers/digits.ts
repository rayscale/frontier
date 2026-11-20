export type TNumberFlowPiece =
  | { kind: 'digit'; key: string; digit: number; glyphs: readonly string[] }
  | { kind: 'text'; key: string; text: string }

const digitCount = 10

export function resolveDigitGlyphs(locale: string | undefined): readonly string[] | undefined {
  const formatter = new Intl.NumberFormat(locale, { useGrouping: false })
  const glyphs = Array.from({ length: digitCount }, (_, digit) => formatter.format(digit))
  const singleCharacter = glyphs.every((glyph) => Array.from(glyph).length === 1)
  const unique = new Set(glyphs).size === digitCount

  return singleCharacter && unique ? glyphs : undefined
}

function isAnimatablePart(part: Intl.NumberFormatPart): boolean {
  return part.type === 'integer' || part.type === 'fraction'
}

function createTextPiece(part: Intl.NumberFormatPart, index: number): TNumberFlowPiece {
  return { kind: 'text', key: `${part.type}-${String(index)}`, text: part.value }
}

export function createPieces(
  parts: readonly Intl.NumberFormatPart[],
  glyphs: readonly string[] | undefined,
): TNumberFlowPiece[] {
  const animate =
    glyphs !== undefined &&
    parts.every(
      (part) =>
        !isAnimatablePart(part) ||
        Array.from(part.value).every((character) => glyphs.includes(character)),
    )

  if (glyphs === undefined || !animate) {
    return parts.map(createTextPiece)
  }

  const integerDigitCount = parts.reduce(
    (count, part) => (part.type === 'integer' ? count + Array.from(part.value).length : count),
    0,
  )

  const pieces: TNumberFlowPiece[] = []
  let integerDigitsSeen = 0
  let fractionDigitsSeen = 0

  parts.forEach((part, index) => {
    if (!isAnimatablePart(part)) {
      pieces.push(createTextPiece(part, index))
      return
    }

    for (const character of part.value) {
      const digit = glyphs.indexOf(character)

      if (part.type === 'integer') {
        const place = integerDigitCount - 1 - integerDigitsSeen
        integerDigitsSeen += 1
        pieces.push({ kind: 'digit', key: `integer-${String(place)}`, digit, glyphs })
      } else {
        pieces.push({
          kind: 'digit',
          key: `fraction-${String(fractionDigitsSeen)}`,
          digit,
          glyphs,
        })
        fractionDigitsSeen += 1
      }
    }
  })

  return pieces
}
