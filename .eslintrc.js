module.exports = {
  env: {
    browser: true,
    node: true,
  },
  plugins: ["jsx-a11y"],
  extends: [
    "eslint:recommended",
    "prettier",
    "react-app",
    "plugin:jsx-a11y/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
