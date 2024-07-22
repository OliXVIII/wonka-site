// eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true, // Add ES2020 global variables
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors', // Import plugin rules
    'plugin:import/warnings',
    'plugin:import/typescript', // Typescript specific import rules
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unresolved': 'error', // Ensure imports point to a file/module that can be resolved
    'import/no-commonjs': 'error', // Disallow CommonJS syntax (e.g., require)
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }], // Ensure consistent use of file extension within the import path
  },
};
