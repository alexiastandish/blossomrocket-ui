import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './button'
import Docs from '../../../../utils/Docs'
import DocsFeatures from '../../../../utils/DocsFeatures'
import config from './docs-config.json'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: 'A versatile and accessible button component that supports multiple variants, sizes, and states'
      },
      page: () => (
        <Docs>
          <DocsFeatures features={config.features} />
        </Docs>
      )
    }
  },
  args: { onClick: fn(), variant: 'primary', children: 'Button', fullWidth: false },

  argTypes: {
    variant: {
      select: {
        options: ['primary', 'secondary', 'outline', 'text', 'danger'],
        control: { type: 'select' }
      }
    },
    children: {
      control: { type: 'text' },
      description: 'Button text or content'
    },
    fullWidth: {
      type: 'boolean'
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

// export const Secondary: Story = {
//   args: {
//     variant: 'secondary'
//   }
// }

// export const Outline: Story = {
//   args: {
//     variant: 'outline'
//   }
// }

// export const Large: Story = {
//   args: {
//     size: 'lg'
//   }
// }

// export const Small: Story = {
//   args: {
//     size: 'sm'
//   }
// }

// export const Disabled: Story = {
//   args: {
//     disabled: true
//   }
// }
// export const Loading: Story = {
//   args: {
//     isLoading: true
//   }
// }
