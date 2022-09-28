const webpack = require('webpack');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolveApp = require('./path');
const { merge } = require('webpack-merge');
const devConfig = require('./webpack.dev');

const commonConfig = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'js/[name].[contenthash:8].bundle.js',
    path: resolveApp('./dist'),
    chunkFilename: 'js/[name].[contenthash:8].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.less', '.ts', '.tsx'],
    modules: [resolveApp('src'), 'node_modules'],
    alias: {
      '~': resolveApp('src'),
      '@': resolveApp('src'),
      'components': resolveApp('src/components'),
      'pages': resolveApp('src/pages'),
      'utils': resolveApp('src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new HtmlWebpackPlugin({
      title: '笔试题',
      template: './public/index.html'
    })
  ],
};

module.exports = (env) => {
  const TARGET = process.env.npm_lifecycle_event;
  if (TARGET === 'start') {
    process.env.NODE_ENV = 'development';
    return merge(commonConfig, devConfig);
  }
};
