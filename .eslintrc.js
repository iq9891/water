module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    require.resolve('@fe6/norm/src/eslint/js'),
    "plugin:vue/base",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/vue',
  ],
  plugins: [
    'vue',
    'jsx-control-statements',
    'prettier',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'prettier/prettier': 1,
    'no-param-reassign': ['error', { props: false }],
    'class-methods-use-this': 'off',
    'no-unused-vars': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
