const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require("terser-webpack-plugin");
const loader = require("sass-loader");



const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
  const loaders = [
    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
    "css-loader",
  ]
  if(extra) {
    loaders.push(extra)
  }
  return loaders
}

const optimization = () => {
  const config = {}

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config
}

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader'
  }]

  if (isDev) {
    loaders.push('eslint-loader')
  }
  return loaders
}

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'Virtual-keyboard'),
  },
  optimization: optimization(),
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, './src/assets/favicon.ico'),
    //       to: path.resolve(__dirname, 'virtual-keyboard/assets/icons')
    //     },
    //   ]
    // }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|svg)$/,
        type: 'asset/resource'
      },
      // {
      //   test: /\.woff$/,
      //   type: 'asset/resource'
      // },
    ]
  }
}