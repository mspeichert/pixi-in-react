import React, { useState, useLayoutEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'
import { Container } from 'pixi-in-react'
import useTicker from '../hooks/useTicker'
import Bunny from '../Bunny'

const RotatingContainer = props => {
  const [rotation, setRotation] = useState(0)
  const container = useRef(null)
  const { timestamp, delta } = useTicker()
  useLayoutEffect(
    () => {
      setRotation(rotation - delta / 60)
    },
    [timestamp]
  )
  let width = container.current ? container.current.width : 0
  let height = container.current ? container.current.height : 0
  return (
    <Container
      ref={container}
      rotation={rotation}
      anchor={new PIXI.Point(0.5, 0.5)}
      pivot={new PIXI.Point(width / 2, height / 2)}
      {...props}>
      {[...Array(25)].map((_, index) => (
        <Bunny
          key={`bunny-${index}`}
          x={(index % 5) * 40}
          y={Math.floor(index / 5) * 40}
        />
      ))}
    </Container>
  )
}

export default RotatingContainer
