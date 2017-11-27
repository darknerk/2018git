const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../public',
    inline: true,
    compress: true,
    stats: 'minimal',
    host: 'localhost',
    port: 9000,
    proxy: {
      "/": "http://localhost:5100"
    },
  }
});