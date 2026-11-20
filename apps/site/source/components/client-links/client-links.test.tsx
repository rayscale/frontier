import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router'
import { describe, expect, it } from 'vitest'

import { ClientLinks } from './index.js'

function Where() {
  const location = useLocation()

  return <output>{location.pathname + location.search + location.hash}</output>
}

function renderLinks() {
  render(
    <MemoryRouter initialEntries={['/start']}>
      <ClientLinks />
      <a href="/docs/button?tab=1#api">Internal</a>
      <a href="https://example.com/docs">External</a>
      <a href="/docs/button" target="_blank" rel="noreferrer">
        Blank
      </a>
      <a href="/file.pdf" download>
        Download
      </a>
      <a href="#section">Hash</a>
      <Where />
    </MemoryRouter>,
  )
}

describe('ClientLinks', () => {
  it('routes a click on an internal link without reloading the page', async () => {
    const user = userEvent.setup()
    renderLinks()

    await user.click(screen.getByRole('link', { name: 'Internal' }))

    expect(screen.getByRole('status')).toHaveTextContent('/docs/button?tab=1#api')
  })

  it('leaves external links, new tabs, downloads, and same-page hashes to the browser', async () => {
    const user = userEvent.setup()
    renderLinks()
    const before = screen.getByRole('status').textContent

    for (const name of ['External', 'Blank', 'Download', 'Hash']) {
      const link = screen.getByRole('link', { name })

      link.addEventListener('click', (event) => {
        event.preventDefault()
      })
      await user.click(link)
    }

    expect(screen.getByRole('status')).toHaveTextContent(before)
  })

  it('leaves modified clicks to the browser', async () => {
    const user = userEvent.setup()
    renderLinks()
    const link = screen.getByRole('link', { name: 'Internal' })

    link.addEventListener('click', (event) => {
      event.preventDefault()
    })
    await user.keyboard('{Control>}')
    await user.click(link)
    await user.keyboard('{/Control}')

    expect(screen.getByRole('status')).toHaveTextContent('/start')
  })
})
