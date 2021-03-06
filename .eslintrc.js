module.exports = {
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module"
  }
  ,
  env: {
    "node": true,
    "mocha": true
  }
  ,
  rules: {
    "no-console": 0,
    "no-unused-vars": 1
  }
};
