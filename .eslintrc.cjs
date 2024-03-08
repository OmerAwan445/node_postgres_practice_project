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
    'max-len': ['error', { 'code': 100 }],
    'quotes': ['error', 'any'],
    'no-unused-vars': 'error',
    'no-undef': 'error',
  },
};