import { Spinner } from './spinner'
import Docs from '../../../../utils/Docs'
import DocsFeatures from '../../../../utils/DocsFeatures'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Atoms/Spinner',
  parameters: {
    docs: {
      description: {
        component: 'TODO: spinner component description'
      },
      page: () => (
        <Docs>
          <DocsFeatures />
        </Docs>
      )
    }
  },
  component: Spinner,
  tags: ['autodocs'],
  args: {
    size: 'md'
  }
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
