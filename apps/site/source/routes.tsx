import type { RouteObject } from 'react-router'

import { Layout } from './layout/index.js'
import { Home } from './pages/home/index.js'
import { NotFound } from './pages/not-found/index.js'

/** The routes of the site. Every page renders inside the shared layout. */
export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: '*', Component: NotFound },
    ],
  },
]
