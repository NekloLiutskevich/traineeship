const ImportNoCycleConfig = (() => {
  console.log('ESLINT_CYCLIC:', process.env.ESLINT_CYCLIC ?? null)

  switch (process.env.ESLINT_CYCLIC) {
    case 'OFF':
      return ['off']
    case 'PART':
      return [
        'error',
        {
          maxDepth: 2,
          ignoreExternal: true,
          disableScc: true,
        },
      ]
    case 'ALL':
    default:
      return [
        'error',
        {
          maxDepth: 2,
          ignoreExternal: true,
          disableScc: false,
        },
      ]
  }
})()

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  globals: {},
  extends: [
    'react-app/jest',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:eslint-comments/recommended',
    'plugin:prettier/recommended',
    // 'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'testing-library',
    'jest',
    'jsx-a11y',
    'import',
    'eslint-comments',
    // 'storybook',
    'prettier',
    '@typescript-eslint',
    'react-hooks',
    'react',
  ],
  overrides: [
    {
      files: ['src/shared/**/*.*'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
  rules: {
    'import/no-named-as-default-member': ['off'],
    'import/export': ['off'],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@mui/*'],
            message: "Please use MUI in 'shared' folder only",
          },
        ],
      },
    ],
    'import/no-restricted-paths': [
      'error',
      {
        basePath: 'src',
        zones: [
          {
            target: ['shared'],
            from: ['entities', 'features', 'widgets', 'pages', 'app'],
            message:
              "You cannot import layer 'entities|features|widgets|pages|app' into 'shared' (shared -> entities -> features -> widgets -> pages -> app)",
          },
          {
            target: ['entities'],
            from: ['features', 'widgets', 'pages', 'app'],
            message:
              "You cannot import layer 'features|widgets|pages|app' into 'entities' (shared -> entities -> features -> widgets -> pages -> app)",
          },
          {
            target: ['features'],
            from: ['widgets', 'pages', 'app'],
            message:
              "You cannot import layer 'widgets|pages|app' into 'features' (shared -> entities -> features -> widgets -> pages -> app)",
          },
          {
            target: ['widgets'],
            from: ['pages', 'app'],
            message:
              "You cannot import layer 'pages|app' into 'widgets' (shared -> entities -> features -> widgets -> pages -> app)",
          },
          {
            target: ['pages'],
            from: ['app'],
            message:
              "You cannot import layer 'app' into 'pages' (shared -> entities -> features -> widgets -> pages -> app)",
          },
        ],
      },
    ],
    'import/no-self-import': ['error'],
    'import/no-cycle': ImportNoCycleConfig,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'shared/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'models',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'collections',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'icons/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'entities/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'features/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'widgets/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'pages/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'app/**/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'styles/*.scss',
            group: 'internal',
            position: 'after',
          },
        ],
        warnOnUnassignedImports: true,
        distinctGroup: false,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    camelcase: 'off',
    'spaced-comment': 'warn',
    quotes: [
      'warn',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'no-duplicate-imports': 'error',
    'no-empty-function': 'off',
    'no-var': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'inline-type-imports',
        prefer: 'type-imports',
      },
    ],
    'no-debugger': 'warn',
    'no-empty': 'warn',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['src', 'node_modules', 'src/shared/api', 'src/shared/assets'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  ignorePatterns: ['*.test.js', 'node_modules'],
}
