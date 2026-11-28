import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Button } from '../button/button.js'

import { AlertDialog, type TAlertDialogActionProps } from './index.js'

afterEach(() => {
  cleanup()
})

function renderDialog(action: TAlertDialogActionProps = {}) {
  return render(
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button variant="danger">Delete project</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete this project?</AlertDialog.Title>
          <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Action variant="danger" {...action}>
            Delete
          </AlertDialog.Action>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>,
  )
}

async function openDialog(): Promise<HTMLElement> {
  await userEvent.setup().click(screen.getByRole('button', { name: 'Delete project' }))

  return screen.findByRole('alertdialog')
}

describe('AlertDialog', () => {
  it('opens from the trigger as an alert dialog with a name and a description', async () => {
    renderDialog()

    const dialog = await openDialog()

    expect(dialog.getAttribute('aria-labelledby')).toBe(screen.getByText('Delete this project?').id)
    expect(dialog.getAttribute('aria-describedby')).toBe(
      screen.getByText('This cannot be undone.').id,
    )
  })

  it('is small unless the size says otherwise', async () => {
    renderDialog()

    const dialog = await openDialog()

    expect(dialog.classList.contains('frontier-dialog--small')).toBe(true)
  })

  it('puts the focus on the cancel, even when the action comes first', async () => {
    renderDialog()
    await openDialog()

    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Cancel' }))
    })
  })

  it('has no close button', async () => {
    renderDialog()
    await openDialog()

    expect(screen.queryByRole('button', { name: 'Close dialog' })).toBeNull()
  })

  it('does not close when the backdrop is pressed', async () => {
    renderDialog()
    await openDialog()

    const backdrop = document.querySelector<HTMLElement>('.frontier-dialog__backdrop')
    if (!backdrop) {
      throw new Error('The backdrop is missing.')
    }

    fireEvent.pointerDown(backdrop)
    fireEvent.mouseDown(backdrop)
    fireEvent.click(backdrop)

    expect(screen.getByRole('alertdialog')).toBeTruthy()
  })

  it('closes with Escape', async () => {
    const user = userEvent.setup()
    renderDialog()
    await openDialog()

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).toBeNull()
    })
  })

  it('closes with the cancel', async () => {
    const user = userEvent.setup()
    renderDialog()
    await openDialog()

    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).toBeNull()
    })
  })

  it('calls onClick and closes with the action', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderDialog({ onClick })
    await openDialog()

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onClick).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).toBeNull()
    })
  })

  it('stays open when onClick prevents the default, so a slow action can finish first', async () => {
    const user = userEvent.setup()
    renderDialog({
      onClick: (event) => {
        event.preventDefault()
      },
    })
    await openDialog()

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(screen.getByRole('alertdialog')).toBeTruthy()
  })

  it('makes the action primary unless the variant says otherwise', async () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialog.Content>
          <AlertDialog.Title>Sign out?</AlertDialog.Title>
          <AlertDialog.Footer>
            <AlertDialog.Action>Sign out</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>,
    )

    const action = await screen.findByRole('button', { name: 'Sign out' })
    expect(action.classList.contains('frontier-button--primary')).toBe(true)
  })

  it('works controlled', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    function Controlled() {
      const [open, setOpen] = useState(true)

      return (
        <AlertDialog
          open={open}
          onOpenChange={(next) => {
            onOpenChange(next)
            setOpen(next)
          }}
        >
          <AlertDialog.Content>
            <AlertDialog.Title>Sure?</AlertDialog.Title>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      )
    }

    render(<Controlled />)
    await user.click(await screen.findByRole('button', { name: 'Cancel' }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('forwards the ref and the class name of the content', async () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <AlertDialog defaultOpen>
        <AlertDialog.Content ref={ref} className="extra">
          <AlertDialog.Title>Sure?</AlertDialog.Title>
        </AlertDialog.Content>
      </AlertDialog>,
    )

    await screen.findByRole('alertdialog')

    expect(ref.current?.classList.contains('extra')).toBe(true)
  })
})
