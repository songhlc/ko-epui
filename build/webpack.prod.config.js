var config = require('./webpack.base.config'),
  path = require('path'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  webpack = require('webpack');
var merge = require('webpack-merge')
config.devtool = 'source-map'
config = merge(config, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})
module.exports = config
