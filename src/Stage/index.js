import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import render from '../renderer'

const propTypes = {
  options: PropTypes.shape({
    antialias: PropTypes.bool,
    autoStart: PropTypes.bool,
    backgroundColor: PropTypes.number,
    clearBeforeRender: PropTypes.bool,
    forceCanvas: PropTypes.bool,
    forceFXAA: PropTypes.bool,
    height: PropTypes.number,
    legacy: PropTypes.bool,
    powerPreference: PropTypes.string,
    preserveDrawingBuffer: PropTypes.bool,
    resolution: PropTypes.number,
    roundPixels: PropTypes.bool,
    sharedLoader: PropTypes.bool,
    sharedTicker: PropTypes.bool,
    transparent: PropTypes.bool,
    width: PropTypes.number,
  }),
  children: PropTypes.node.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

const Stage = ({ children, height, width, options }) => {
  const [app, setApp] = useState(null)
  const canvas = useRef(null)

  useEffect(() => {
    if (!app) {
      setApp(
        new PIXI.Application({
          height,
          width,
          view: canvas.current,
          ...options,
        })
      )
    } else {
      render(children, app.stage, undefined, this)
    }
  })

  useEffect(
    () => {
      if (app) {
        app.renderer.resize(width, height)
      }
    },
    [width, height]
  )

  if (options?.view) return null
  return <canvas ref={canvas} />
}

Stage.propTypes = propTypes
Stage.defaultProps = {
  options: {},
}

export default Stage
