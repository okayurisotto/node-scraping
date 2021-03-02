module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  target: 'node',
};
