import invariant from 'tiny-invariant'

function shim(): any {
  invariant(
    false,
    'Pixi-in-react renderer does not support persistence. Please file an issue'
  )
}

// Persistence (when unsupported)
export const supportsPersistence = false
export const cloneInstance = shim
export const createContainerChildSet = shim
export const appendChildToContainerChildSet = shim
export const finalizeContainerChildren = shim
export const replaceContainerChildren = shim
export const cloneHiddenInstance = shim
export const cloneUnhiddenInstance = shim
export const createHiddenTextInstance = shim
