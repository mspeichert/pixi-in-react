import * as React from 'react'
import ReactReconciler from 'react-reconciler'
import * as hostConfig from './hostConfig'
import { PixiProps, PixiComponentType, PixiInstance } from './types'
import pkg from '../package.json'

const Reconciler = ReactReconciler<
  PixiComponentType, // Type
  PixiProps, // Props
  PIXI.Container, // Container
  PixiInstance, // Instance
  void, // TextInstance
  PixiInstance, // HydratableInstance
  PixiInstance, // Public
  object, // HostContext
  PixiProps, // Update Payload
  undefined, // ChildSet
  any, // TimoutHandle
  -1 // NoTimeout
>(hostConfig)

const roots = new Map() // TODO

export default (
  element: React.ReactNode,
  containerTag: PIXI.Container,
  callback: () => any = () => {},
  parent: any // TODO
) => {
  let root = roots.get(containerTag)
  if (!root) {
    root = Reconciler.createContainer(containerTag, false, false)
    roots.set(containerTag, root)
  }

  Reconciler.injectIntoDevTools({
    bundleType: process.env.NODE_ENV === 'development' ? 1 : 0,
    version: pkg.version,
    rendererPackageName: pkg.name,
  })

  Reconciler.updateContainer(element, root, parent, callback)

  return Reconciler.getPublicRootInstance(root)
}
