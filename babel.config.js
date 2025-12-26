const workletsPluginOptions = {};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
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
