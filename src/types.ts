import * as PIXI from 'pixi.js'
import * as React from 'react'

export type PixiProps = Partial<StageProps> &
  Partial<SpriteProps> &
  Partial<TextProps> &
  Partial<CustomProps>

export interface StageProps {
  options?: PIXI.ApplicationOptions
  children?: React.ReactNode
  width: number
  height: number
}

export interface TextProps {
  text: string
}

export interface SpriteProps {
  texture: PIXI.Texture
  style?: PIXI.TextStyle
  canvas?: HTMLCanvasElement
}

export interface CustomProps {
  behavior?: Behavior
  type?: string
  [key: string]: any
}

export type PixiComponentType =
  | 'Sprite'
  | 'Container'
  | 'Graphics'
  | 'Text'
  | 'Custom'

export type PixiInstance = PIXI.DisplayObject & {
  [key: string]: any
}

export interface Behavior {
  create: (
    type: PixiComponentType,
    props: PixiProps
  ) => PIXI.DisplayObject | null
  applyProps: (instance: PixiInstance, props: PixiProps) => void
}

export interface PixiTypes {
  [key: string]: PixiComponentType
}
