module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
		'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  },
};
