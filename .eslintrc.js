module.exports = {
  root: true,
  extends: '@react-community',
  plugins: ['import'],
  env: {
    jest: true,
  },
  rules: {
    'import/no-default-export': 2,
    
    'no-shadow': 2,
    'arrow-body-style': ['error', 'as-needed'],
    'prefer-const': 2,
  },
};
