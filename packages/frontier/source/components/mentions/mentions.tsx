import { HistoryExtension } from '@lexical/history'
import { PlainTextExtension } from '@lexical/plain-text'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalExtensionComposer } from '@lexical/react/LexicalExtensionComposer'
import { defineExtension } from 'lexical'
import { forwardRef, type ReactElement, type ReactNode, useId, useState } from 'react'

import { classNames } from '../../internal/helpers/class-names.js'
import type { TCssCustomProperties } from '../../internal/helpers/css-custom-properties.js'
import { Field } from '../field/field.js'

import { writeText } from './helpers/editor.js'
import { MentionNode } from './helpers/mention-node.js'
import { MentionSync } from './parts/sync.js'
import { MentionTypeahead } from './parts/typeahead.js'
import type { TMentionsProps } from './types.js'

import '../../internal/styles/floating-surface.css'
import '../../internal/styles/option-list.css'
import '../../internal/styles/visually-hidden.css'
import './mentions.css'

export type {
  TMentionDetails,
  TMentionItem,
  TMentionsProps,
  TMentionTrigger,
  TMentionValue,
} from './types.js'

function MentionLabel({ children, id }: { children: ReactNode; id: string }): ReactElement {
  const [editor] = useLexicalComposerContext()

  return (
    <Field.Label
      id={id}
      onClick={() => {
        editor.focus()
      }}
    >
      {children}
    </Field.Label>
  )
}

/**
 * A text field where people mention things: typing a trigger such as `@` or `/` opens a list, and
 * the item they choose becomes a chip in the text. A chip is deleted whole, with one press, as a
 * character is, and undo brings it back. The value is plain text, with the chips written as their
 * text. It forwards its ref to the editable element. It is built on Lexical.
 */
export const Mentions = forwardRef<HTMLDivElement, TMentionsProps>(function Mentions(
  {
    'aria-label': ariaLabel,
    className,
    defaultValue,
    description,
    disabled = false,
    error,
    footer,
    id,
    invalid = false,
    label,
    name,
    onKeyDown,
    onQueryChange,
    onSelect,
    onSubmit,
    onValueChange,
    placeholder = '',
    readOnly = false,
    rows = 3,
    singleLine = false,
    triggers,
    value,
  },
  ref,
) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const labelId = `${fieldId}-label`
  const descriptionId = `${fieldId}-description`
  const errorId = `${fieldId}-error`
  const invalidState = invalid || Boolean(error)
  const editable = !disabled && !readOnly
  const [initial] = useState(() => {
    const text = value ?? defaultValue ?? ''

    return {
      editor: defineExtension({
        $initialEditorState: () => {
          writeText(text, triggers)
        },
        dependencies: [PlainTextExtension, HistoryExtension],
        editable,
        name: '@rayscale/frontier/Mentions',
        namespace: 'frontier-mentions',
        nodes: [MentionNode],
        onError: (cause: Error) => {
          throw cause
        },
      }),
      text,
    }
  })
  const [text, setText] = useState(initial.text)
  const describedBy = [description && descriptionId, error && errorId].filter(Boolean).join(' ')
  const customProperties: TCssCustomProperties = { '--_rows': String(singleLine ? 1 : rows) }

  return (
    <Field.Root
      data-invalid={invalidState || undefined}
      data-readonly={readOnly ? true : undefined}
      disabled={disabled}
      invalid={invalidState}
    >
      <LexicalExtensionComposer contentEditable={null} extension={initial.editor}>
        {label && <MentionLabel id={labelId}>{label}</MentionLabel>}
        <Field.Box className="frontier-mentions__box">
          <div className="frontier-mentions__area">
            <ContentEditable
              ref={ref}
              aria-describedby={describedBy || undefined}
              aria-disabled={disabled || undefined}
              aria-invalid={invalidState || undefined}
              aria-label={label ? undefined : ariaLabel}
              aria-labelledby={label ? labelId : undefined}
              aria-multiline={!singleLine}
              aria-placeholder={placeholder}
              aria-readonly={readOnly || undefined}
              className={classNames(
                'frontier-field__control',
                'frontier-mentions__input',
                singleLine && 'frontier-mentions__input--single',
                className,
              )}
              id={fieldId}
              placeholder={
                <div aria-hidden="true" className="frontier-mentions__placeholder">
                  {placeholder}
                </div>
              }
              style={customProperties}
              onKeyDown={onKeyDown}
            />
          </div>
          {footer && <div className="frontier-mentions__footer">{footer}</div>}
        </Field.Box>
        <MentionSync
          editable={editable}
          initialText={initial.text}
          singleLine={singleLine}
          triggers={triggers}
          value={value}
          onSubmit={onSubmit}
          onTextChange={setText}
          onValueChange={onValueChange}
        />
        <MentionTypeahead triggers={triggers} onQueryChange={onQueryChange} onSelect={onSelect} />
      </LexicalExtensionComposer>
      {description && <Field.Description id={descriptionId}>{description}</Field.Description>}
      {error && (
        <Field.Error id={errorId} match aria-live="polite">
          {error}
        </Field.Error>
      )}
      {name !== undefined && <input name={name} type="hidden" value={text} />}
    </Field.Root>
  )
})
