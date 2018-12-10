import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import { Stage } from 'pixi-in-react'
import RotatingBunny from './CustomBunny'

const OPTIONS = {
  backgroundColor: 0x1099bb,
}

let scale = new PIXI.Point(2.0, 2.0)
class BunnyExample extends Component {
  render() {
    return (
      <Stage width={800} height={600} options={OPTIONS}>
        <RotatingBunny x={400} y={300} scale={scale} />
      </Stage>
    )
  }
}

export default BunnyExample
