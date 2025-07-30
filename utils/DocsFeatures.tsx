import React from 'react'
export default function DocFeatures({ features }: { features: string[] }) {
  console.log('features', features)
  return (
    <ul>
      {features.map((feature) => (
        <li key={feature}>{feature}</li>
      ))}
    </ul>
  )
}
