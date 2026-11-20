import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import { routes } from './routes.js'

import '@rayscale/frontier/styles.css'
import './site.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('The root element is missing from index.html.')
}

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </StrictMode>,
)
