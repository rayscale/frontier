import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { forwardRef, Fragment } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { AnimatedHighlight } from '../../../internal/primitives/animated-highlight/animated-highlight.js'
import { Shortcut } from '../../shortcut/shortcut.js'
import { useCommandContext } from '../context.js'
import { isCommandGroup } from '../helpers/filter.js'
import type { TCommandGroup, TCommandItem, TCommandItemProps, TCommandListProps } from '../types.js'

export const CommandItemPart = forwardRef<HTMLDivElement, TCommandItemProps>(
  function CommandItemPart({ item, className, ...props }, ref) {
    const { selectItem } = useCommandContext('Command.Item')

    return (
      <BaseAutocomplete.Item
        ref={ref}
        value={item}
        disabled={item.disabled}
        className={classNames('frontier-command__item', className)}
        {...props}
        onClick={() => {
          selectItem(item)
        }}
      >
        {item.symbol && (
          <span className="frontier-command__item-symbol" aria-hidden="true">
            {item.symbol}
          </span>
        )}
        <span className="frontier-command__item-text">
          {item.label}
          {item.description && (
            <span className="frontier-command__item-description">{item.description}</span>
          )}
        </span>
        {item.shortcut && item.shortcut.length > 0 && (
          <span className="frontier-command__item-shortcut">
            {item.shortcut.map((key, index) => (
              <Shortcut key={`${key}-${String(index)}`}>{key}</Shortcut>
            ))}
          </span>
        )}
      </BaseAutocomplete.Item>
    )
  },
)

export const CommandList = forwardRef<HTMLDivElement, TCommandListProps>(function CommandList(
  { className, children, ...props },
  ref,
) {
  const renderItem = children ?? ((item: TCommandItem) => <CommandItemPart item={item} />)

  return (
    <div className="frontier-command__list-frame">
      <AnimatedHighlight />
      <BaseAutocomplete.List
        ref={ref}
        aria-label="Commands"
        className={classNames('frontier-command__list', className)}
        {...props}
      >
        {(entry: TCommandItem | TCommandGroup, index: number) =>
          isCommandGroup(entry) ? (
            <BaseAutocomplete.Group
              key={entry.label}
              items={entry.items}
              className="frontier-command__group"
            >
              <BaseAutocomplete.GroupLabel className="frontier-command__group-label">
                {entry.label}
              </BaseAutocomplete.GroupLabel>
              <BaseAutocomplete.Collection>
                {(item: TCommandItem, itemIndex: number) => (
                  <Fragment key={item.value}>{renderItem(item, itemIndex)}</Fragment>
                )}
              </BaseAutocomplete.Collection>
            </BaseAutocomplete.Group>
          ) : (
            <Fragment key={entry.value}>{renderItem(entry, index)}</Fragment>
          )
        }
      </BaseAutocomplete.List>
    </div>
  )
})
