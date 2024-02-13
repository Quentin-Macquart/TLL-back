const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const { NODE_ENV } = process.env;
const plugins = NODE_ENV === 'local' ? [new NodemonPlugin()] : [];
const mode = NODE_ENV === 'local' ? 'development' : 'production';
module.exports = {
  mode,
  entry: './server.ts',
  target: 'node',
  watch: NODE_ENV === 'local',
  node: {
    __filename: true,
    __dirname: true,
  },
  externals: [nodeExternals()],
  optimization: {
    nodeEnv: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@app': path.resolve(__dirname, 'src'),
    },
    modules: ['node_modules', 'src', 'package.json'],
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
