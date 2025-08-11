import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../lib/**/*.mdx', '../lib/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-vitest', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  }
}
export default config
