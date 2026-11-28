import type { TMentionTrigger, TMentionValue } from '../types.js'

/** A piece of a line: plain text, or the text of an item, which is shown as a chip. */
export type TSegment = { readonly text: string } & (
  { readonly mention: TMentionValue } | { readonly mention?: undefined }
)

const boundary = /[\s.,;:!?)\]]/

/** The text that a chip of an item has. */
export function getMentionText(
  trigger: TMentionTrigger,
  item: TMentionTrigger['items'][number],
): string {
  return item.insert ?? `${trigger.char}${item.label}`
}

/**
 * Splits a line into plain text and chips: a chip is the text of an item that stands on its own,
 * after a space or at the start. The longest text wins when one starts with another.
 */
export function parseLine(
  line: string,
  triggers: readonly TMentionTrigger[],
  startsText: boolean,
): readonly TSegment[] {
  const candidates = triggers
    .flatMap((trigger) =>
      trigger.items.map((item) => ({
        atStart: trigger.atStart === true,
        mention: { id: item.id, text: getMentionText(trigger, item), trigger: trigger.char },
      })),
    )
    .sort((first, second) => second.mention.text.length - first.mention.text.length)
  const segments: TSegment[] = []
  let plain = ''
  let position = 0

  while (position < line.length) {
    const standsAlone = position === 0 || /\s/.test(line.charAt(position - 1))
    const first = startsText && line.slice(0, position).trim() === ''
    const found = standsAlone
      ? candidates.find(({ atStart, mention }) => {
          const end = position + mention.text.length

          return (
            mention.text.length > 0 &&
            (!atStart || first) &&
            line.startsWith(mention.text, position) &&
            (end === line.length || boundary.test(line.charAt(end)))
          )
        })
      : undefined

    if (found) {
      if (plain) {
        segments.push({ text: plain })
        plain = ''
      }

      segments.push({ mention: found.mention, text: found.mention.text })
      position += found.mention.text.length
    } else {
      plain += line.charAt(position)
      position += 1
    }
  }

  if (plain) {
    segments.push({ text: plain })
  }

  return segments
}
