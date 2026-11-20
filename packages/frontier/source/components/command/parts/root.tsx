import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { type ReactElement, useCallback, useMemo, useState } from 'react'

import { AutoSize } from '../../../internal/primitives/auto-size/auto-size.js'
import { Dialog } from '../../dialog/dialog.js'
import { commandContext, type TCommandContextValue } from '../context.js'
import { isGroupedCommandList, matchesCommandQuery } from '../helpers/filter.js'
import { useCommandShortcut } from '../hooks/use-command-shortcut.js'
import type { TCommandDialogProps, TCommandRootProps } from '../types.js'

import { CommandEmpty } from './group.js'
import { CommandInput } from './input.js'
import { CommandList } from './list.js'

export function CommandRoot({
  items,
  filter = matchesCommandQuery,
  onItemSelect,
  children,
}: TCommandRootProps): ReactElement {
  const contextValue = useMemo<TCommandContextValue>(
    () => ({
      selectItem: (item) => {
        onItemSelect?.()
        Promise.resolve(item.onSelect?.()).catch((error: unknown) => {
          queueMicrotask(() => {
            throw error
          })
        })
      },
    }),
    [onItemSelect],
  )
  const content = (
    <AutoSize>
      {children ?? (
        <>
          <CommandInput />
          <CommandList />
          <CommandEmpty />
        </>
      )}
    </AutoSize>
  )

  const root = isGroupedCommandList(items) ? (
    <BaseAutocomplete.Root items={items} filter={filter}>
      {content}
    </BaseAutocomplete.Root>
  ) : (
    <BaseAutocomplete.Root items={items} filter={filter}>
      {content}
    </BaseAutocomplete.Root>
  )

  return <commandContext.Provider value={contextValue}>{root}</commandContext.Provider>
}

/**
 * Modal command palette. It owns open state and the keyboard shortcut, and closes
 * itself when a command is chosen.
 */
export function CommandDialog({
  open,
  defaultOpen = false,
  onOpenChange,
  shortcut = 'Mod+K',
  label = 'Command palette',
  size = 'medium',
  items,
  filter,
  children,
}: TCommandDialogProps): ReactElement {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const controlled = open !== undefined
  const openState = open ?? uncontrolledOpen

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!controlled) {
        setUncontrolledOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    },
    [controlled, onOpenChange],
  )

  useCommandShortcut(shortcut, () => {
    setOpen(!openState)
  })

  const closePalette = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <Dialog open={openState} onOpenChange={setOpen}>
      <Dialog.Content
        size={size}
        showCloseButton={false}
        aria-label={label}
        className="frontier-command__dialog"
      >
        <CommandRoot items={items} filter={filter} onItemSelect={closePalette}>
          {children}
        </CommandRoot>
      </Dialog.Content>
    </Dialog>
  )
}
