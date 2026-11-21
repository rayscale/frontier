import type { Decorator, Preview } from '@storybook/react-vite'

import '../source/styles/index.css'
import './preview.css'

const withMode: Decorator = (story, context) => {
  document.documentElement.dataset.mode = context.globals.mode === 'dark' ? 'dark' : 'light'

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
  },

  initialGlobals: {
    mode: 'light',
  },

  decorators: [withMode],

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
