import { TYPES } from './utils'
import { SpriteProps, TextProps, CustomProps } from './types'
/* Public API */

export { default as Stage } from './Stage'

/**
 * Wrapper component for PIXI Container
 *
 * See: https://github.com/mikolajspeichert/pixi-in-react
 */
export const Container = (TYPES.CONTAINER as unknown) as React.FunctionComponent<
  CustomProps
> // That is a workaround because setting this as a string type disallows to use it in a typed react app

/**
 * Wrapper component for PIXI Graphics
 *
 * See: https://github.com/mikolajspeichert/pixi-in-react
 */
export const Graphics = (TYPES.GRAPHICS as unknown) as React.FunctionComponent<
  CustomProps
>

/**
 * Wrapper component for PIXI Sprite
 *
 * See: https://github.com/mikolajspeichert/pixi-in-react
 */
export const Sprite = (TYPES.SPRITE as unknown) as React.FunctionComponent<
  SpriteProps & CustomProps
>

/**
 * Wrapper component for PIXI Text
 *
 * See: https://github.com/mikolajspeichert/pixi-in-react
 */
export const Text = (TYPES.TEXT as unknown) as React.FunctionComponent<
  TextProps & CustomProps
>

/**
 * Wrapper component for Custom PIXI Component
 *
 * See: https://github.com/mikolajspeichert/pixi-in-react
 */
export const Custom = (TYPES.CUSTOM as unknown) as React.FunctionComponent<
  CustomProps
>
