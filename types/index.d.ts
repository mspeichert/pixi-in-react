declare module 'tiny-invariant' {
  export = invariant

  function invariant(condition: any, message?: string): void
}

declare module 'performance-now' {
  export = now

  function now(): number
}

declare module '*.json' {
  const value: any
  export default value
}

declare module '*.png' {
  const value: any
  export default value
}
