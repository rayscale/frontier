import type { RouteObject } from 'react-router'

import { RootLayout } from '#/layout/root-layout.js'

/** The routes of the site. Each screen loads on demand. */
export const routes: RouteObject[] = [
  {
    Component: RootLayout,
    children: [
      {
        lazy: async () => ({
          Component: (await import('#/layout/landing-layout.js')).LandingLayout,
        }),
        children: [
          {
            index: true,
            lazy: async () => ({ Component: (await import('#/pages/home/index.js')).Home }),
          },
          {
            path: '*',
            lazy: async () => ({
              Component: (await import('#/pages/not-found/index.js')).NotFound,
            }),
          },
        ],
      },
      {
        path: '/docs',
        lazy: async () => ({ Component: (await import('#/components/docs/index.js')).DocsLayout }),
        children: [
          {
            index: true,
            lazy: async () => ({ Component: (await import('#/pages/docs/index.js')).DocsPage }),
          },
          {
            path: '*',
            lazy: async () => ({ Component: (await import('#/pages/docs/index.js')).DocsPage }),
          },
        ],
      },
    ],
  },
]
