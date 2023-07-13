module.exports = {
  extends: ['@bjerk/eslint-config'],
  ignorePatterns: 'dist/*',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};
