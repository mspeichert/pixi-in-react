import { sizeSnapshot } from 'rollup-plugin-size-snapshot'

const json = require('rollup-plugin-json')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const globals = require('rollup-plugin-node-globals')
const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')
const { uglify } = require('rollup-plugin-uglify')
const visualizer = require('rollup-plugin-visualizer')

const isProd = env => env === 'production'

const config = (env, format) => ({
  input: 'compiled/index.js',
  output: {
    file: `./dist/pixi-in-react.${format}.${env}.js`,
    name: 'PixiInReact',
    exports: 'named',
    format,
  },
  plugins: [
    json(),
    resolve(),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': `'${env}'`,
    }),
    commonjs({
      ignoreGlobal: false,
      include: [
        'node_modules/@babel/**',
        'node_modules/object-assign/**',
        'node_modules/performance-now/**',
        'node_modules/prop-types/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/react-reconciler/**',
        'node_modules/scheduler/**',
      ],
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      plugins: [
        ['@babel/plugin-transform-runtime', { useESModules: format !== 'cjs' }],
      ],
    }),
    globals(),
    isProd(env) && sizeSnapshot(),
    isProd(env) && uglify(),
    visualizer(),
  ],
  external: ['pixi.js', 'prop-types', 'react', 'react-dom'],
})

export default [
  config('development', 'cjs'),
  config('production', 'cjs'),
  config('development', 'umd'),
  config('production', 'umd'),
]
