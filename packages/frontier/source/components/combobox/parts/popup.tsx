import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { forwardRef, Fragment } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { AnimatedHighlight } from '../../../internal/primitives/animated-highlight/animated-highlight.js'
import { isOptionGroup } from '../helpers/items.js'
import type {
  TComboboxContentProps,
  TComboboxEmptyProps,
  TComboboxListProps,
  TComboboxOption,
  TComboboxOptionGroup,
} from '../types.js'

import { ComboboxItem } from './item.js'

export const ComboboxContent = forwardRef<HTMLDivElement, TComboboxContentProps>(
  function ComboboxContent(
    {
      side = 'bottom',
      align = 'start',
      sideOffset = 4,
      alignOffset,
      className,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className="frontier-combobox__positioner"
        >
          <BaseCombobox.Popup
            ref={ref}
            className={classNames('frontier-combobox__popup frontier-floating-surface', className)}
            {...props}
          >
            <AnimatedHighlight />
            {children}
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    )
  },
)

export const ComboboxList = forwardRef<HTMLDivElement, TComboboxListProps>(function ComboboxList(
  { className, children, ...props },
  ref,
) {
  const renderOption =
    children ??
    ((option: TComboboxOption) => (
      <ComboboxItem value={option.value} disabled={option.disabled}>
        {option.label}
      </ComboboxItem>
    ))

  return (
    <BaseCombobox.List
      ref={ref}
      className={classNames('frontier-combobox__list', className)}
      {...props}
    >
      {(entry: TComboboxOption | TComboboxOptionGroup, index: number) =>
        isOptionGroup(entry) ? (
          <BaseCombobox.Group
            key={entry.label}
            items={entry.items}
            className="frontier-combobox__group"
          >
            <BaseCombobox.GroupLabel className="frontier-combobox__group-label">
              {entry.label}
            </BaseCombobox.GroupLabel>
            <BaseCombobox.Collection>
              {(option: TComboboxOption, optionIndex: number) => (
                <Fragment key={option.value}>{renderOption(option, optionIndex)}</Fragment>
              )}
            </BaseCombobox.Collection>
          </BaseCombobox.Group>
        ) : (
          <Fragment key={entry.value}>{renderOption(entry, index)}</Fragment>
        )
      }
    </BaseCombobox.List>
  )
})

export const ComboboxEmpty = forwardRef<HTMLDivElement, TComboboxEmptyProps>(function ComboboxEmpty(
  { className, ...props },
  ref,
) {
  return (
    <BaseCombobox.Empty
      ref={ref}
      className={classNames('frontier-combobox__empty', className)}
      {...props}
    />
  )
})
