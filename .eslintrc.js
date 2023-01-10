module.exports = {
  "parserOptions": {
    "ecmaVersion": 2018,
  },
  "overrides": [
    {
      "files": ["config/**/*.js", "src/**/*.js", "src/plugins/**/server/**/*.js"],
      "excludedFiles": ["src/admin/**/*.js", "src/client/**/*.js", "src/plugins/**/admin/**/*.js"],
      ...require("./.eslintrc.back.js"),
    },
    {
      "files": ["src/admin/**/*.js", "src/client/**/*.js", "src/plugins/**/admin/**/*.js"],
      ...require("./.eslintrc.front.js"),
    },
  ],
};