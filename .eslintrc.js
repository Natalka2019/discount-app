module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb/hooks', // "plugin:react/hooks", // react/recommended
    'airbnb/base',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jest'
  ],
  rules: {
    'no-console': 'off',
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'no-extra-parens': ['error', 'all'],
    'array-callback-return': 'error',
    curly: 'error',
    'default-case': 'warn',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'guard-for-in': 'warn',
    'no-caller': 'error',
    'no-empty-function': 'error',
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-floating-decimal': 'error',
    'no-lone-blocks': 'error',
    'no-multi-spaces': 'error',
    'no-new': 'warn',
    'no-return-assign': 'error',
    'no-self-compare': 'error',
    'no-useless-call': 'error',
    'no-undef-init': 'error',
    'block-spacing': 'error',
    'brace-style': 'error',
    'comma-dangle': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'new-cap': ['error', { newIsCap: true }],
    'new-parens': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-prototype-builtins': 'off',
    'no-var': 'warn',
    'no-unused-vars': ['error', { vars: 'local' }],
    'no-magic-numbers': ['warn', { ignore: [0, 1] }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  }
};
