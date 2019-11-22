const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/build/',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      Utils$: path.resolve(__dirname, './src/utils/index.ts'),
    },
  },
  devServer: {
    contentBase: 'build',
    open: true,
    openPage: 'build/index.html',
    noInfo: true,
    hot: true,
    overlay: true,
    clientLogLevel: 'none',
  },
  watchOptions: {
    ignored: ['build', 'node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      title: 'Simple Typescript Starter',
      template: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
