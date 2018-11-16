module.exports = {
  parser: 'babel-eslint',

  plugins: ['prettier', 'react'],

  extends: [ 'airbnb', 'prettier', 'prettier/react', 'plugin:react/recommended'],

  globals: {
    __DEV__: true,
    jest: true,
    it: true,
    expect: true,
    describe: true,
    beforeEach: true,
    beforeAll: true,
    after: true,
    afterEach: true,
    afterAll: true,
    before: true,
    fetch: true,
    use: true,
  },

  env: {
    browser: true,
  },

  rules: {
    'prettier/prettier': [
      'warn', {
        singleQuote: true,

        trailingComma: 'es5',

        semi: false,

        jsxBracketSameLine: true,
      },
    ],

    'import/extensions': 'off',

    'import/no-unresolved': 'off',

    'import/no-extraneous-dependencies': 'off',

    'import/prefer-default-export': 'off',

    'import/no-dynamic-require': 'off',

    'consistent-return': 'off',

    'vars-on-top': 'off',

    'no-console': 'off',

    'no-var': 'off',

    'no-shadow': 'warn',

    'no-unused-expressions': 'warn',

    'no-restricted-syntax': 'warn',

    'no-param-reassign': 'off',

    'no-underscore-dangle': ['error', { allow: ['_id'] }],

    'no-dynamic-require': 'off',

    'no-return-assign': 'off',

    'arrow-body-style': 'warn',

    'new-cap': 'warn',

    'prefer-const': 'off',

    'global-require': 'off',

    'no-bitwise': 'off',

    'no-continue': 'off',

    'no-plusplus': 'off',

    'no-redeclare': 'off',

    'no-unused-vars': 'off',

    'react/jsx-uses-react': 'warn',

    'react/jsx-uses-vars': 'warn',

    'jsx-a11y/no-static-element-interactions': 'off',

    'jsx-a11y/click-events-have-key-events': 'off',

    'jsx-a11y/no-noninteractive-element-interactions': 'off',

    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

    'react/prefer-stateless-function': 'off',

    'react/prop-types': 'off',

    'react/forbid-prop-types': 'off',

    'react/no-unused-prop-types': 'warn',

    'react/self-closing-comp': 'warn',

    'react/jsx-one-expression-per-line': 'off',

    'import/no-absolute-path': 'off',

    eqeqeq: 'warn',

  },

  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
}
