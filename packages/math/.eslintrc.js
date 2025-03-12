module.exports ={
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "standard",
    "@olliecaine/eslint-config"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  plugins: [
    "promise",
    "pure"
  ],
  env: {
    browser : true,
    jest : true,
    node: true
  },
  globals: {
    expect       : false,
    should       : false,
    sinon        : false,
    __DEV__      : false,
    __TEST__     : false,
    __PROD__     : false,
    __COVERAGE__ : false
  },
  rules: {
    "no-unused-vars"              : "off",
    "key-spacing"                 : "off",
    "jsx-quotes"                  : [2, "prefer-single"],
    "object-curly-spacing"        : [2, "always"],
    "pure/pure"                   : "warn",
    "no-case-declarations"        : 2,
    "semi"                        : [1, "never"],
    "comma-dangle"                : "off",
    "no-undef"                    : "off",
    "one-var"                     : "off"
  }
}
