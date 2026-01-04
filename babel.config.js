const workletsPluginOptions = {};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
    ['react-native-worklets/plugin', workletsPluginOptions],
  ],
};
