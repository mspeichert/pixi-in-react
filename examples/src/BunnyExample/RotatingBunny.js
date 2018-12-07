import React, { useState, useLayoutEffect } from 'react'
import useTicker from '../hooks/useTicker'
import Bunny from '../Bunny'

const RotatingBunny = props => {
  const [rotation, setRotation] = useState(0)
  const { timestamp, delta } = useTicker()
  useLayoutEffect(
    () => {
      setRotation(rotation - delta / 60)
    },
    [timestamp]
  )
  return <Bunny {...props} rotation={rotation} />
}

export default RotatingBunny
