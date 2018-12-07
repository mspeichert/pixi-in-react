import React, { Component } from 'react'
import { Stage } from 'pixi-in-react'
import RotatingContainer from './RotatingContainer'

const OPTIONS = {
  backgroundColor: 0x1099bb,
}

class BunnyExample extends Component {
  render() {
    return (
      <Stage width={800} height={600} options={OPTIONS}>
        <RotatingContainer x={400} y={300} />
      </Stage>
    )
  }
}

export default BunnyExample
