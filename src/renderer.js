import Reconciler from 'react-reconciler'
import invariant from 'fbjs/lib/invariant'
import now from 'performance-now'
import { LIB_NAME, PIXI_INSTANCE_DEFAULTS } from 'src/constants'
import { TYPES } from 'src/types'
import * as PIXI from 'pixi.js'

const noop = () => {}
const returnEmpty = () => ({})
const returnFalse = () => false

function isPointType(value) {
  return value instanceof PIXI.Point || value instanceof PIXI.ObservablePoint
}

const setPixiValue = (instance, key, value) => {
  if (isPointType(instance[key])) {
    invariant(
      isPointType(value),
      `Value for the prop ${key} should be an instance of PIXI.Point or PIXI.ObservablePoint`
    )
    instance[key].copy(value)
  } else {
    instance[key] = value
  }
}

const applyProps = (instance, props) => {
  Object.keys(this.props)
    .filter(key => key !== 'children')
    .forEach(key => {
      const value = props[key]
      if (value) setPixiValue(instance, key, value)
      else if (
        typeof instance[key] !== 'undefined' &&
        PIXI_INSTANCE_DEFAULTS[key]
      ) {
        setPixiValue(instance, key, PIXI_INSTANCE_DEFAULTS[key])
      } else if (__DEV__)
        console.warn(
          `Prop ${key} with value ${value} was not applied to instance`,
          instance
        )
    })
}

const appendChild = () => {}

const hostConfig = {
  now,
  getRootHostContext: returnEmpty,
  getChildHostContext: returnEmpty,
  prepareForCommit: noop,
  resetAfterCommit: noop,
  shouldSetTextContent: returnFalse,
  finalizeInitialChildren: returnFalse,
  createInstance: (type, props) => {
    let instance

    switch (type) {
      case TYPES.CONTAINER:
        instance = new PIXI.Container()
        break
      case TYPES.GRAPHICS:
        instance = new PIXI.Graphics()
        break
      case TYPES.SPRITE:
        instance = new PIXI.Sprite(props.texture)
        break
      case TYPES.TEXT:
        instance = new PIXI.Text(props.text, props.style, props.canvas)
        break
      default:
        instance = null
        break
    }

    invariant(instance, `${LIB_NAME} does not recognize the type: ${type}`)

    applyProps(instance, props)

    return instance
  },
  createTextInstance: () => {
    invariant(
      false,
      `${LIB_NAME} does not support text instances. Use Text component instead.`
    )
  },
  appendChild,
  appendInitialChild: appendChild,
  appendChildToContainer: appendChild,
  supportsMutation: true,
}

export default (element, domElement, callback) => {}
