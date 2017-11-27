const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack')

const webpackAntd = require('atool-build/lib/webpack');

module.exports = {
  entry: {
    app: './client/app.jsx'
  },
  module:{
    exprContextCritical: false,
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css?$/, 
        loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: [path.resolve(__dirname, "node_modules")], 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader']
        })
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: 'file-loader',
        options:{
          hash:'sha512',
          digest:'hex',
          name:'./assets/images/[hash].[ext]'
        }
      },
      {
        test: /\.(svg|ico)$/,
        exclude: [/node_modules/],
        loader: 'url-loader',
        options:{
          hash:'sha512', 
          digest:'hex',
          name:'./assets/images/icons/[name].[ext]'
        }
      },
      {
        test: /\.(ttf|eot)$/,
        exclude: [/node_modules/],
        loader: 'url-loader',
        options:{
          hash:'sha512',
          digest:'hex',
          name:'./assets/fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      title: 'Production',
      hash: true,
      /*
      minify: {
        collapseWhitespace: true
      },
      */
      template: './client/index.ejs'
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/[name]-[chunkhash].css',
      disable: false,
      allChunks: true
    })
  ],
  output: {
    filename: '[name]-[chunkhash].bundle.js',
    path: path.resolve(__dirname, '../public/js')
  },
  resolve : {
    extensions: [".js",".jsx" ],
    modules : ['node_modules', 'public']
},
};