import {
  $applyNodeReplacement,
  DecoratorNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from 'lexical'

export type TSerializedMentionNode = Spread<
  { mentionId: string; text: string; trigger: string },
  SerializedLexicalNode
>

/**
 * A chip in the text. It is a single element that cannot be edited, so the cursor stays outside it
 * and one press of Backspace or Delete takes it away whole, as it would a character.
 */
export class MentionNode extends DecoratorNode<null> {
  public readonly mentionId: string
  public readonly text: string
  public readonly trigger: string

  public constructor(text: string, mentionId: string, trigger: string, key?: NodeKey) {
    super(key)
    this.text = text
    this.mentionId = mentionId
    this.trigger = trigger
  }

  public static override getType(): string {
    return 'frontier-mention'
  }

  public static override clone(node: MentionNode): MentionNode {
    return new MentionNode(node.text, node.mentionId, node.trigger, node.__key)
  }

  public static override importJSON(serialized: TSerializedMentionNode): MentionNode {
    return createMentionNode(serialized.text, serialized.mentionId, serialized.trigger)
  }

  public override exportJSON(): TSerializedMentionNode {
    return {
      ...super.exportJSON(),
      mentionId: this.mentionId,
      text: this.text,
      trigger: this.trigger,
    }
  }

  public override createDOM(): HTMLElement {
    const element = document.createElement('span')
    element.className = 'frontier-mentions__chip'
    element.setAttribute('contenteditable', 'false')
    // A chip is a name, not prose: the browser does not underline it as a mistake.
    element.setAttribute('spellcheck', 'false')
    element.setAttribute('data-mention-id', this.mentionId)
    element.setAttribute('data-trigger', this.trigger)
    element.textContent = this.text

    return element
  }

  public override updateDOM(): false {
    return false
  }

  /** The element made above is all there is to show. */
  public override decorate(): null {
    return null
  }

  public override getTextContent(): string {
    return this.text
  }

  public override isInline(): true {
    return true
  }

  public override isKeyboardSelectable(): false {
    return false
  }
}

/** Makes a chip. Call it inside an update of the editor. */
export function createMentionNode(text: string, mentionId: string, trigger: string): MentionNode {
  return $applyNodeReplacement(new MentionNode(text, mentionId, trigger))
}
