import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot, COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND } from 'lexical'
import { useEffect, useLayoutEffect, useRef } from 'react'

import { readMentions, writeText } from '../helpers/editor.js'
import type { TMentionsProps } from '../types.js'

interface TMentionSyncProps extends Pick<
  TMentionsProps,
  'onSubmit' | 'onValueChange' | 'singleLine' | 'triggers' | 'value'
> {
  readonly editable: boolean
  readonly initialText: string
  readonly onTextChange: (text: string) => void
}

/** Keeps the editor and the props of the field in step. */
export function MentionSync({
  editable,
  initialText,
  onSubmit,
  onTextChange,
  onValueChange,
  singleLine = false,
  triggers,
  value,
}: TMentionSyncProps): null {
  const [editor] = useLexicalComposerContext()
  const textRef = useRef(initialText)
  const latest = useRef({ onSubmit, onTextChange, onValueChange, triggers })
  useLayoutEffect(() => {
    latest.current = { onSubmit, onTextChange, onValueChange, triggers }
  })

  useEffect(() => {
    editor.setEditable(editable)
  }, [editable, editor])

  useEffect(
    () =>
      editor.registerUpdateListener(({ editorState }) => {
        const { mentions, text } = editorState.read(() => ({
          mentions: readMentions(),
          text: $getRoot().getTextContent(),
        }))

        if (text !== textRef.current) {
          textRef.current = text
          latest.current.onTextChange(text)
          latest.current.onValueChange?.(text, { mentions })
        }
      }),
    [editor],
  )

  // A text set by the parent replaces the content. It leaves the focus where it is.
  useEffect(() => {
    if (value === undefined || value === textRef.current) {
      return
    }

    textRef.current = value
    latest.current.onTextChange(value)
    editor.update(
      () => {
        writeText(value, latest.current.triggers)
      },
      { tag: 'skip-dom-selection' },
    )
  }, [editor, value])

  const submits = onSubmit !== undefined
  useEffect(() => {
    if (!singleLine && !submits) {
      return undefined
    }

    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        // With a place to send to, Shift and Enter still starts a new line.
        if (event?.isComposing === true || (!singleLine && event?.shiftKey === true)) {
          return false
        }

        event?.preventDefault()
        latest.current.onSubmit?.()

        return true
      },
      COMMAND_PRIORITY_HIGH,
    )
  }, [editor, singleLine, submits])

  return null
}
