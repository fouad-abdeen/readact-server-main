module.exports = {
  env: {
    browser: false,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "no-underscore-dangle": "off",
    "no-console": "off",
    "linebreak-style": ["error", "windows"],
  },
};
