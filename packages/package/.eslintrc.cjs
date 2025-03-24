module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    '@olliecaine/eslint-config'
  ],
  plugins: [
    'promise',
    'pure'
  ],
  env: {
    browser: true,
    jest: true,
    node: true
  },
  globals: {
    expect: false,
    should: false,
    sinon: false,
    __DEV__: false,
    __TEST__: false,
    __PROD__: false,
    __COVERAGE__: false
  },
  rules: {
    'jsx-quotes': [2, 'prefer-single'],
    'no-case-declarations': 2,
    'comma-dangle': 'off',
    'no-undef': 'off',
    'one-var': 'off'
  }
}
