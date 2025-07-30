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
    layout: 'centered',
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

  argTypes: {
    variant: {
      select: {
        options: ['primary', 'secondary', 'outline', 'text', 'danger'],
        control: { type: 'select' }
      }
    }
  },
  args: { onClick: fn() }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button'
  }
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Button'
  }
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Button'
  }
}
