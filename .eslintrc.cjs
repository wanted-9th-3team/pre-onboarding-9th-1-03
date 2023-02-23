module.exports = {
  
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'standard-with-typescript',
      'plugin:prettier/recommended',
    ],
    overrides: [
      {
        files: ['src/**/*.{ts,tsx}'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          project: ['./tsconfig.json'],
        },
      },
    ],
    parserOptions: {
      ecmaVersion: latest,
      sourceType: module,
    },
    plugins: ['react',"prettier", "react-hooks"],
    rules: {
      "prettier/prettier" : "error",
      'no-var': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'space-before-function-paren': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
    },

}
