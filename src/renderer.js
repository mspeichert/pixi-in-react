import ReactReconciler from 'react-reconciler'
import * as PIXI from 'pixi.js'
import invariant from 'tiny-invariant'
import now from 'performance-now'
import { LIB_NAME, PIXI_INSTANCE_DEFAULTS } from './constants'
import { TYPES } from './types'

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
  Object.keys(props)
    .filter(key => key !== 'children')
    .forEach(key => {
      const value = props[key]
      if (value !== undefined) setPixiValue(instance, key, value)
      else if (
        typeof instance[key] !== 'undefined' &&
        PIXI_INSTANCE_DEFAULTS[key]
      ) {
        setPixiValue(instance, key, PIXI_INSTANCE_DEFAULTS[key])
      } else {
        console.warn(
          `Prop ${key} with value ${value} was not applied to instance`,
          instance
        )
      }
    })
}

const diffProps = (element, type, oldProps, newProps) => {
  let updatePayload = {}
  Object.keys(oldProps).forEach(key => {
    if (key === 'children') return
    if(!newProps.hasOwnProperty(key)){ // eslint-disable-line
      updatePayload[key] = null // prop that disappeared
    }
  })

  Object.keys(newProps).forEach(key => {
    if (key === 'children') return
    const value = newProps[key]
    if(!oldProps.hasOwnProperty(key) || value !== oldProps[key]){ // eslint-disable-line
      updatePayload[key] = newProps[key] // new prop or changed prop
    }
  })
  // console.log(updatePayload)
  if (!Object.keys(updatePayload).length) return null
  return updatePayload
}

const appendChild = (parent, child) => {
  // console.log(parent) // TODO remove
  parent.addChild(child)
}

const removeChild = (parent, child) => {
  parent.removeChild(child)
  child.destroy()
}

const commitUpdate = (instance, updatePayload) => {
  applyProps(instance, updatePayload)
}

const shouldDeprioritizeSubtree = (type, props) => {
  const isAlphaVisible = typeof props.alpha === 'undefined' || props.alpha > 0
  const isRenderable =
    typeof props.renderable === 'undefined' || props.renderable === true
  const isVisible =
    typeof props.visible === 'undefined' || props.visible === true

  return !(isAlphaVisible && isRenderable && isVisible)
}

const insertBefore = (parent, child, before) => {
  invariant(child !== before, 'Cannot insert node before itself')

  const childExists = parent.children.indexOf(child) !== -1
  const index = parent.getChildIndex(before)

  if (childExists) {
    parent.setChildIndex(child, index)
  } else {
    parent.addChildAt(child, index)
  }
}

const hostConfig = {
  now,
  getRootHostContext: returnEmpty,
  getChildHostContext: returnEmpty,
  getPublicInstance: inst => inst,
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
  removeChild,
  removeChildFromContainer: removeChild,
  commitUpdate,
  prepareUpdate: diffProps,
  prepareForCommit: noop,
  shouldDeprioritizeSubtree,
  insertBefore,
  insertInContainerBefore: insertBefore,
  supportsMutation: true,
  isPrimaryRenderer: false,
}

const Reconciler = ReactReconciler(hostConfig)

const roots = new Map() // TODO

export default (element, containerTag, callback, parent) => {
  let root = roots.get(containerTag)
  if (!root) {
    root = Reconciler.createContainer(containerTag)
    roots.set(containerTag, root)
  }

  Reconciler.updateContainer(element, root, parent, callback)

  return Reconciler.getPublicRootInstance(root)
}
