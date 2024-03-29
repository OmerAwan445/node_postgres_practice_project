module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'plugins': ['import'],
  'extends': 'google',
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', { 'code': 120 }],
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'camelcase': 'off',
    "quotes": "off",
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": false,
        "ClassDeclaration": false,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true,
      },
    }],
  },
};

