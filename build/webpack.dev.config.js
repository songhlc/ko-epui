var config = require('./webpack.base.config'),
  path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge')
config.entry = path.resolve(__dirname, '../') + '/example/index.js'
config.devtool = 'inline-source-map'
config = merge(config, {
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: "example",
      // css: [ "../../css/"+key+".css" ],
      //生成模板地址
      template: './example/index.html',
      filename: 'index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ["index"],
      //要把script插入到标签里
      inject: 'body'
    })
    // https://github.com/ampedandwired/html-webpack-plugin
  ]
})
module.exports = config
