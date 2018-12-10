import React, { useState, useLayoutEffect } from 'react'
import * as PIXI from 'pixi.js'
import { Custom } from 'pixi-in-react'
import useTicker from '../hooks/useTicker'
import bunny from '../Bunny/bunny.png'

const CustomBunny = () => {
  const [rotation, setRotation] = useState(0)
  const { timestamp, delta } = useTicker()
  useLayoutEffect(
    () => {
      setRotation(rotation - delta / 60)
    },
    [timestamp]
  )
  let behavior = {
    create: () => {
      let instance = new PIXI.Sprite(PIXI.Texture.fromImage(bunny))
      instance.x = 400
      instance.y = 300
      instance.anchor = new PIXI.Point(0.5, 0.5)
      return instance
    },
    applyProps: (instance, newProps) => {
      if (newProps.rotation) {
        instance.rotation = newProps.rotation
      }
    },
  }
  return <Custom rotation={rotation} behavior={behavior} type="Sprite" />
}

export default CustomBunny
