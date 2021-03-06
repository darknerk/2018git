const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack =require('webpack')

module.exports = merge(common, {
  devtool: 'eval',
  plugins: [
    new UglifyJSPlugin()
  ],
  
});