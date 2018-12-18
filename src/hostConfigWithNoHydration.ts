import invariant from 'tiny-invariant'

function shim(): any {
  invariant(
    false,
    'Pixi-in-react renderer does not support persistence. Please file an issue'
  )
}

// Hydration (when unsupported)
export const supportsHydration = false
export const canHydrateInstance = shim
export const canHydrateTextInstance = shim
export const getNextHydratableSibling = shim
export const getFirstHydratableChild = shim
export const hydrateInstance = shim
export const hydrateTextInstance = shim
export const didNotMatchHydratedContainerTextInstance = shim
export const didNotMatchHydratedTextInstance = shim
export const didNotHydrateContainerInstance = shim
export const didNotHydrateInstance = shim
export const didNotFindHydratableContainerInstance = shim
export const didNotFindHydratableContainerTextInstance = shim
export const didNotFindHydratableInstance = shim
export const didNotFindHydratableTextInstance = shim
