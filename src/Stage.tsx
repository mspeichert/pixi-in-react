import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'

import { StageProps } from './types'
import render from './renderer'

/**
 * Wrapper component for PIXI Application
 *
 * See: https://github.com/mikolajspeichert/pixi-in-react
 */
const Stage: React.FunctionComponent<StageProps> = ({
  children,
  height,
  width,
  options = {},
}: StageProps) => {
  const [app, setApp] = useState<null | PIXI.Application>(null)
  const canvas = useRef(null)

  useEffect(() => {
    setApp(
      new PIXI.Application({
        height,
        width,
        view: canvas.current,
        ...options,
      } as PIXI.ApplicationOptions)
    )

    return () => {
      if (app) {
        app.destroy()
      }
    }
  }, [])

  useLayoutEffect(
    () => {
      if (app) {
        app.renderer.resize(width, height)
      }
    },
    [width, height]
  )

  if (app) {
    render(children, app.stage, undefined, this)
  }

  if (options.view) {
    return null
  }
  return <canvas ref={canvas} />
}

export default Stage
