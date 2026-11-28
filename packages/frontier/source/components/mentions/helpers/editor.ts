import {
  $createLineBreakNode,
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $isElementNode,
} from 'lexical'

import type { TMentionTrigger, TMentionValue } from '../types.js'

import { createMentionNode, MentionNode } from './mention-node.js'
import { parseLine } from './parse.js'

/** Replaces the content of the editor with a text. Call it inside an update of the editor. */
export function writeText(text: string, triggers: readonly TMentionTrigger[]): void {
  const paragraph = $createParagraphNode()

  for (const [index, line] of text.split('\n').entries()) {
    if (index > 0) {
      paragraph.append($createLineBreakNode())
    }

    for (const segment of parseLine(line, triggers, index === 0)) {
      paragraph.append(
        segment.mention
          ? createMentionNode(segment.text, segment.mention.id, segment.mention.trigger)
          : $createTextNode(segment.text),
      )
    }
  }

  $getRoot().clear().append(paragraph)
}

/** The chips of the editor, in order. Call it inside a read of the editor. */
export function readMentions(): readonly TMentionValue[] {
  return $getRoot()
    .getChildren()
    .flatMap((block) => ($isElementNode(block) ? block.getChildren() : []))
    .filter((node): node is MentionNode => node instanceof MentionNode)
    .map((node) => ({ id: node.mentionId, text: node.text, trigger: node.trigger }))
}
