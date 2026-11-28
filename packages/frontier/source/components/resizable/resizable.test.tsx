import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Resizable } from './index.js'

function renderGroup(props: Parameters<typeof Resizable.Root>[0] = {}) {
  return render(
    <Resizable.Root aria-label="Workspace" {...props}>
      <Resizable.Panel id="one" defaultSize={50} minSize={20} data-testid="one">
        One
      </Resizable.Panel>
      <Resizable.Handle id="handle" />
      <Resizable.Panel id="two" defaultSize={50} minSize={20} data-testid="two">
        Two
      </Resizable.Panel>
    </Resizable.Root>,
  )
}

describe('Resizable', () => {
  it('renders panels with a separator between them', () => {
    renderGroup()

    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('lays panels out in a row by default and in a column when vertical', () => {
    const { rerender } = renderGroup()

    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical')

    rerender(
      <Resizable.Root orientation="vertical">
        <Resizable.Panel defaultSize={50}>One</Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel defaultSize={50}>Two</Resizable.Panel>
      </Resizable.Root>,
    )

    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('applies the component classes and keeps consumer classes', () => {
    const { container } = renderGroup({ className: 'custom' })

    expect(container.querySelector('.frontier-resizable.custom')).toBeInTheDocument()
    expect(container.querySelectorAll('.frontier-resizable__panel')).toHaveLength(2)
    expect(container.querySelector('.frontier-resizable__handle')).toBeInTheDocument()
  })

  it('shows a decorative grip only when requested', () => {
    const { container, rerender } = renderGroup()

    expect(container.querySelector('.frontier-resizable__grip')).not.toBeInTheDocument()

    rerender(
      <Resizable.Root>
        <Resizable.Panel defaultSize={50}>One</Resizable.Panel>
        <Resizable.Handle grip />
        <Resizable.Panel defaultSize={50}>Two</Resizable.Panel>
      </Resizable.Root>,
    )

    expect(container.querySelector('.frontier-resizable__grip')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
  })

  it('marks a disabled handle as disabled', () => {
    render(
      <Resizable.Root>
        <Resizable.Panel defaultSize={50}>One</Resizable.Panel>
        <Resizable.Handle disabled />
        <Resizable.Panel defaultSize={50}>Two</Resizable.Panel>
      </Resizable.Root>,
    )

    const handle = screen.getByRole('separator')
    expect(handle).toHaveAttribute('aria-disabled', 'true')
  })

  it('forwards refs and native attributes to the elements', () => {
    const rootRef = createRef<HTMLDivElement>()
    const panelRef = createRef<HTMLDivElement>()
    const handleRef = createRef<HTMLDivElement>()
    render(
      <Resizable.Root ref={rootRef} aria-label="Editor">
        <Resizable.Panel ref={panelRef} defaultSize={50} data-testid="panel">
          One
        </Resizable.Panel>
        <Resizable.Handle ref={handleRef} aria-label="Resize editor" />
        <Resizable.Panel defaultSize={50}>Two</Resizable.Panel>
      </Resizable.Root>,
    )

    expect(rootRef.current).toHaveAttribute('aria-label', 'Editor')
    expect(panelRef.current).toBe(screen.getByTestId('panel'))
    expect(handleRef.current).toBe(screen.getByRole('separator', { name: 'Resize editor' }))
  })

  it('treats a number size as a percentage', () => {
    renderGroup()

    expect(screen.getByRole('separator')).toHaveAttribute('aria-valuenow', '50')
  })
})
