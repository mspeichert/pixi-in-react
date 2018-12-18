import invariant from 'tiny-invariant'
import performanceNow from 'performance-now'
import * as PIXI from 'pixi.js'
import { PixiComponentType, PixiProps, PixiInstance, Behavior } from './types'
import {
  noop,
  returnArg,
  returnEmpty,
  returnFalse,
  isPointType,
  TYPES,
  PIXI_INSTANCE_DEFAULTS,
} from './utils'

export type HostContext = object

export * from './hostConfigWithNoPersistence'
export * from './hostConfigWithNoHydration'
const filteredProps: Array<string> = ['children', 'behavior']

const setPixiValue = (instance: PixiInstance, key: string, value: any) => {
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

const applyProps = (instance: PixiInstance, props: PixiProps) => {
  if (props.behavior && props.behavior.applyProps) {
    props.behavior.applyProps(instance, props)
  } else {
    Object.keys(props)
      .filter(key => !filteredProps.includes(key))
      .forEach(key => {
        const value = props[key]
        if (value !== undefined) {
          setPixiValue(instance, key, value)
        } else if (
          typeof instance[key] !== 'undefined' &&
          PIXI_INSTANCE_DEFAULTS[key]
        ) {
          // prop is undefined, but maybe we have a default for it
          setPixiValue(instance, key, PIXI_INSTANCE_DEFAULTS[key])
        } else {
          console.warn(
            `Prop ${key} with value ${value} was not applied to instance`,
            instance
          )
        }
      })
  }
}

export const now = performanceNow

export const getPublicInstance: (
  arg: PIXI.DisplayObject
) => PIXI.DisplayObject = returnArg

export const appendChild = (
  parent: PIXI.Container,
  child: PIXI.DisplayObject
): void => {
  parent.addChild(child)
}

export const appendInitialChild = appendChild

export const appendChildToContainer = appendChild // TODO IS IT NECESSARY?

export const insertBefore = (
  parent: PIXI.Container,
  child: PIXI.DisplayObject,
  beforeChild: PIXI.DisplayObject
) => {
  invariant(
    child !== beforeChild,
    'Pixi-in-react: cannot insert node before itself'
  )

  const childExists = parent.children.includes(child)
  const index = parent.getChildIndex(beforeChild)
  if (childExists) {
    parent.setChildIndex(child, index)
  } else {
    parent.addChildAt(child, index)
  }
}

export const insertInContainerBefore = insertBefore

export const removeChild = (
  parent: PIXI.Container,
  child: PIXI.DisplayObject
): void => {
  parent.removeChild(child)
  child.destroy()
}

export const removeChildFromContainer = removeChild

export const finalizeInitialChildren = returnFalse

export const getRootHostContext: (
  rootContainerInstance: HostContext
) => HostContext = returnEmpty

export const getChildHostContext: (
  parentHostContext: HostContext,
  type: string,
  rootContainerInstance: PIXI.Container
) => HostContext = returnEmpty

export const createInstance = (
  type: PixiComponentType,
  props: PixiProps
): PIXI.DisplayObject => {
  let instance: PIXI.DisplayObject
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
    case TYPES.CUSTOM:
      invariant(
        props.type || (props.behavior && props.behavior.create),
        `Custom component requires either type prop or behavior create function`
      )
      instance =
        props.behavior && props.behavior.create
          ? props.behavior.create(type, props)
          : new (PIXI as { [key: string]: any })[props.type!]()
      break
    default:
      // Unrecognized type, so we throw
      invariant(false, `Pixi-in-react does not recognize the type: ${type}`)
      throw '' // unrachable, but ts doesnt know that invariant will throw
      break
  }

  applyProps(instance, props)

  return instance
}

export const prepareUpdate = (
  element: PIXI.DisplayObject,
  type: PixiComponentType,
  oldProps: PixiProps,
  newProps: PixiProps
): null | object => {
  let updatePayload: PixiProps = {
    behavior: (newProps.behavior as Behavior) || {},
  } // behavior is a default prop and I don't know yet where to define it
  Object.keys(oldProps)
    .filter(key => !filteredProps.includes(key))
    .forEach(key => {
      if (!newProps.hasOwnProperty(key)) {
        updatePayload[key] = null // prop that disappeared
      }
    })

  Object.keys(newProps)
    .filter(key => !filteredProps.includes(key))
    .forEach(key => {
      if (filteredProps.includes(key)) {
        return
      }
      const value = newProps[key]
      if (!oldProps.hasOwnProperty(key) || value !== oldProps[key]) {
        updatePayload[key] = newProps[key] // new prop or changed prop
      }
    })
  if (!Object.keys(updatePayload).length) {
    return null
  }
  return updatePayload
}

export const commitUpdate = (
  instance: PixiInstance,
  updatePayload: PixiProps
): void => {
  applyProps(instance, updatePayload)
}

export const prepareForCommit = noop

export const resetAfterCommit = noop

export const shouldSetTextContent = returnFalse

export const shouldDeprioritizeSubtree = (
  type: PixiComponentType,
  props: PixiProps
): boolean => {
  const isAlphaVisible = typeof props.alpha === 'undefined' || props.alpha > 0
  const isRenderable =
    typeof props.renderable === 'undefined' || props.renderable === true
  const isVisible =
    typeof props.visible === 'undefined' || props.visible === true

  return !(isAlphaVisible && isRenderable && isVisible)
}

export const createTextInstance: () => void = () => {
  invariant(
    false,
    `Pixi-in-react does not support text instances. Use Text component instead.`
  )
}

export const supportsMutation = true

export const isPrimaryRenderer = false

export const scheduleDeferredCallback = noop

export const cancelDeferredCallback = noop

export const setTimeout = (handler: any) => -1
export const clearTimeout = (handle: number) => {}
export const noTimeout = -1
