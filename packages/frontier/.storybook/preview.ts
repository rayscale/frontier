import type { Decorator, Preview } from '@storybook/react-vite'

import { themeMetadata } from '../source/themes/themes.generated.js'

import '../source/styles/index.css'
import '../source/styles/themes/index.css'
import './preview.css'

const defaultTheme = 'frontier'

const withMode: Decorator = (story, context) => {
  document.documentElement.dataset.mode = context.globals.mode === 'dark' ? 'dark' : 'light'

  return story()
}

const withTheme: Decorator = (story, context) => {
  const theme: unknown = context.globals.theme

  if (typeof theme === 'string' && theme !== defaultTheme) {
    document.documentElement.dataset.theme = theme
  } else {
    delete document.documentElement.dataset.theme
  }

  return story()
}

const preview: Preview = {
  globalTypes: {
    mode: {
      description: 'Color mode',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: themeMetadata.map((theme) => ({ value: theme.name, title: theme.title })),
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    mode: 'light',
    theme: defaultTheme,
  },

  decorators: [withMode, withTheme],

  parameters: {
    // The page background follows the mode; disable Storybook's separate control.
    backgrounds: {
      disable: true,
    },
    a11y: {
      test: 'error',
    },
  },
}

export default preview
