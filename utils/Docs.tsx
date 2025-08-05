import React from 'react'
import { Title, Description, Primary, Controls, Stories } from '@storybook/addon-docs/blocks'

export default function Docs({ children }: { children?: React.ReactNode }) {
  // This component is used to render the documentation for the Storybook stories.
  // It uses the blocks from @storybook/addon-docs to display the title, description, primary story,
  return (
    <div className='w-full'>
      <Title />
      <Description />
      {children}
      <Primary />
      <Controls />
      <Stories />
    </div>
  )
}
