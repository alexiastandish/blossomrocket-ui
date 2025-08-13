import type { Preview } from '@storybook/react-vite'
import './preview.css'
import '../lib/index.css'

const preview: Preview = {
  decorators: [
    (Story, { viewMode }) => {
      const isDocsPAge = viewMode === 'docs'
      return (
        <div className={`w-full flex items-center justify-center ${`${isDocsPAge ? 'h-[100%] p-3' : 'h-screen'}`}`}>
          <Story />
        </div>
      )
    }
  ],
  parameters: {
    layout: 'fullscreen',

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  }
}

export default preview
