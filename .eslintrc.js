module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 0,
    'linebreak-style': 0,
    'no-param-reassign': 0,
    'no-dupe-else-if': 0,
    'max-len': 0,
  },
};
