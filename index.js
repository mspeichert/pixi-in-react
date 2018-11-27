if (process.env.NODE_ENV === 'production') {
  module.exports = require('./pixi-in-react.cjs.production.js')
} else {
  module.exports = require('./pixi-in-react.cjs.development.js')
}
