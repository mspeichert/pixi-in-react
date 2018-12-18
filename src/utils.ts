import * as PIXI from 'pixi.js'
import { PixiTypes } from './types'

export const TYPES: PixiTypes = {
  CONTAINER: 'Container',
  GRAPHICS: 'Graphics',
  SPRITE: 'Sprite',
  TEXT: 'Text',
  CUSTOM: 'Custom',
}

export const PIXI_INSTANCE_DEFAULTS: { [key: string]: any } = {
  alpha: 1,
  buttonMode: false,
  cacheAsBitmap: false,
  cursor: 'auto',
  filterArea: null,
  filters: null,
  hitArea: null,
  interactive: false,
  mask: null,
  pivot: 0,
  position: 0,
  renderable: true,
  rotation: 0,
  scale: 1,
  skew: 0,
  transform: null,
  visible: true,
  x: 0,
  y: 0,
}

export const noop = () => {}
export const returnEmpty = () => ({})
export const returnFalse = () => false
export const returnArg = <T>(arg: T): T => arg

export const isPointType = (value: any): boolean => {
  return value instanceof PIXI.Point || value instanceof PIXI.ObservablePoint
}
