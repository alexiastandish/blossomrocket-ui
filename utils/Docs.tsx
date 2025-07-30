import React from 'react'
import { Title, Description, Primary, Controls, Stories } from '@storybook/addon-docs/blocks'

export default function Docs({ children, ...rest }: { children?: React.ReactNode }) {
  console.log('rest', rest)
  // This component is used to render the documentation for the Storybook stories.
  // It uses the blocks from @storybook/addon-docs to display the title, description, primary story,
  return (
    <>
      <Title />
      <Description />
      {children}
      <Primary />
      <Controls />
      <Stories />
    </>
  )
}
