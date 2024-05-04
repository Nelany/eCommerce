module.exports = {
  root: true,
  env: { browser: true, es2020: true, "jest": true},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:import/recommended",
    'plugin:react-hooks/recommended',
    'prettier',
  ],

  ignorePatterns: ['dist', '.eslintrc.cjs'],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },

  plugins: ['react-refresh', "@typescript-eslint", "import", "jest"],

  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
   
    "@typescript-eslint/no-explicit-any": "error",
    "implicit-arrow-linebreak": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "import/extensions": [
      "error",
      "ignorePackages",
      { 
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },

    'import/resolver': {
      alias: {
        map: [
          ['', './public']
        ],
        extensions: ['.ts', '.tsx']
      }
    }
  }
};
