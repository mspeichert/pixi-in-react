import React from 'react'
import { Link } from 'react-router-dom'

function ExampleList({ examples }) {
  return (
    <div>
      {examples.map(example => (
        <div key={example.slug}>
          <Link to={`/${example.slug}`}>{example.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default ExampleList
