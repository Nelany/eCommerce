module.exports = {
  root: true,
  env: { browser: true, es2020: true },

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

  plugins: ['react-refresh', "@typescript-eslint", "import"],

  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

   
    "@typescript-eslint/no-explicit-any": 2,
    "implicit-arrow-linebreak": 0,
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
    "import/resolver": {
      "typescript": {}
    }
  }
};
