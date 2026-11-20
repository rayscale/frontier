import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { forwardRef, Fragment } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { AnimatedHighlight } from '../../../internal/primitives/animated-highlight/animated-highlight.js'
import { FloatingPopup } from '../../../internal/primitives/floating-popup/floating-popup.js'
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
      <FloatingPopup
        Portal={BaseCombobox.Portal}
        Positioner={BaseCombobox.Positioner}
        Popup={BaseCombobox.Popup}
        placement={{ side, align, sideOffset, alignOffset }}
        positionerClassName="frontier-combobox__positioner"
        popupProps={{
          ...props,
          ref,
          className: classNames(
            'frontier-combobox__popup frontier-option-popup frontier-floating-surface',
            className,
          ),
          children: (
            <>
              <AnimatedHighlight />
              {children}
            </>
          ),
        }}
      />
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
      className={classNames('frontier-combobox__list frontier-option-list', className)}
      {...props}
    >
      {(entry: TComboboxOption | TComboboxOptionGroup, index: number) =>
        isOptionGroup(entry) ? (
          <BaseCombobox.Group
            key={entry.label}
            items={entry.items}
            className="frontier-combobox__group frontier-option-group"
          >
            <BaseCombobox.GroupLabel className="frontier-combobox__group-label frontier-option-group__label">
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
