import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Shortcut } from '../shortcut/shortcut.js'

import { ContextMenu } from './index.js'

function BasicContextMenu(props: {
  onSelect?: () => void
  onOpenChange?: (open: boolean) => void
}) {
  return (
    <ContextMenu.Root onOpenChange={props.onOpenChange}>
      <ContextMenu.Trigger>
        <p>Workspace surface</p>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>File</ContextMenu.GroupLabel>
          <ContextMenu.Item onClick={props.onSelect}>
            Rename
            <Shortcut>F2</Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Item disabled onClick={props.onSelect}>
            Delete
          </ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Separator />
        <ContextMenu.Item onClick={props.onSelect}>Duplicate</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}

function ControlledContextMenu({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true)
        }}
      >
        Open externally
      </button>
      <ContextMenu.Root
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen)
          onOpenChange(nextOpen)
        }}
      >
        <ContextMenu.Trigger>
          <p>Workspace surface</p>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Rename</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    </>
  )
}

function CheckableContextMenu() {
  const [wrap, setWrap] = useState(false)
  const [density, setDensity] = useState('comfortable')

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <p>Editor surface</p>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.CheckboxItem checked={wrap} onCheckedChange={setWrap}>
          Wrap lines
        </ContextMenu.CheckboxItem>
        <ContextMenu.RadioGroup value={density} onValueChange={setDensity}>
          <ContextMenu.RadioItem value="comfortable">Comfortable</ContextMenu.RadioItem>
          <ContextMenu.RadioItem value="compact">Compact</ContextMenu.RadioItem>
        </ContextMenu.RadioGroup>
        <ContextMenu.Submenu>
          <ContextMenu.SubmenuTrigger>Export</ContextMenu.SubmenuTrigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Markdown</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Submenu>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}

function openWithRightClick(target: HTMLElement) {
  fireEvent.contextMenu(target, { clientX: 120, clientY: 80 })
}

afterEach(() => {
  cleanup()
})

describe('ContextMenu', () => {
  it('opens the menu on right click and lists its items', async () => {
    render(<BasicContextMenu />)
    openWithRightClick(screen.getByText('Workspace surface'))
    expect(await screen.findByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /Rename/ })).toBeVisible()
    expect(screen.getByRole('menuitem', { name: 'Duplicate' })).toBeVisible()
  })

  it('does not open the menu on a regular click', async () => {
    render(<BasicContextMenu />)
    await userEvent.click(screen.getByText('Workspace surface'))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('renders group labels and separators', async () => {
    render(<BasicContextMenu />)
    openWithRightClick(screen.getByText('Workspace surface'))
    expect(await screen.findByText('File')).toBeVisible()
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('calls the item handler and closes the menu when an item is activated', async () => {
    const onSelect = vi.fn()
    render(<BasicContextMenu onSelect={onSelect} />)
    openWithRightClick(screen.getByText('Workspace surface'))
    const duplicate = await screen.findByRole('menuitem', {
      name: 'Duplicate',
    })
    await userEvent.click(duplicate)
    expect(onSelect).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })

  it('does not activate a disabled item', async () => {
    const onSelect = vi.fn()
    render(<BasicContextMenu onSelect={onSelect} />)
    openWithRightClick(screen.getByText('Workspace surface'))
    const deleteItem = await screen.findByRole('menuitem', { name: 'Delete' })
    await userEvent.click(deleteItem)
    expect(onSelect).not.toHaveBeenCalled()
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('closes the menu when Escape is pressed', async () => {
    const onOpenChange = vi.fn()
    render(<BasicContextMenu onOpenChange={onOpenChange} />)
    openWithRightClick(screen.getByText('Workspace surface'))
    await screen.findByRole('menu')
    await userEvent.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })

  it('reports open state changes through onOpenChange', async () => {
    const onOpenChange = vi.fn()
    render(<BasicContextMenu onOpenChange={onOpenChange} />)
    openWithRightClick(screen.getByText('Workspace surface'))
    expect(await screen.findByRole('menu')).toBeInTheDocument()
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('closes a controlled menu and reports the request through onOpenChange', async () => {
    const onOpenChange = vi.fn()
    render(<ControlledContextMenu onOpenChange={onOpenChange} />)
    openWithRightClick(screen.getByText('Workspace surface'))
    await screen.findByRole('menu')
    await userEvent.click(screen.getByRole('menuitem', { name: 'Rename' }))
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })

  it('toggles a checkbox item without closing the menu', async () => {
    render(<CheckableContextMenu />)
    openWithRightClick(screen.getByText('Editor surface'))
    const wrap = await screen.findByRole('menuitemcheckbox', {
      name: 'Wrap lines',
    })
    await userEvent.click(wrap)
    expect(wrap).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('selects a radio item and reflects the selected value', async () => {
    render(<CheckableContextMenu />)
    openWithRightClick(screen.getByText('Editor surface'))
    const compact = await screen.findByRole('menuitemradio', {
      name: 'Compact',
    })
    await userEvent.click(compact)
    expect(compact).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('menuitemradio', { name: 'Comfortable' })).toHaveAttribute(
      'aria-checked',
      'false',
    )
  })

  it('opens a submenu from its trigger', async () => {
    render(<CheckableContextMenu />)
    openWithRightClick(screen.getByText('Editor surface'))
    const exportTrigger = await screen.findByRole('menuitem', {
      name: 'Export',
    })
    await userEvent.click(exportTrigger)
    expect(await screen.findByRole('menuitem', { name: 'Markdown' })).toBeVisible()
  })
})
