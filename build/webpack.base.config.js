var basepath=process.cwd(),
    path = require('path'),
    distpath = path.resolve(basepath,  "./dist"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    webpack = require("webpack");
var projectRoot = path.resolve(__dirname, '../')
//当前支持的所有语种及对应多语资源包
var config = {
    cache: true,
    entry: projectRoot + "/src/index.js",
    output: {
        path: distpath,
        publicPath: "/",
        filename: "index.js"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: projectRoot,
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', "stage-0"]
                }
            },
            {
                test: /\.css$|\.less$/,
                loader: ExtractTextPlugin.extract("style","css!less")
            }, {
                test: /\.html/,
                loader: "html?interpolate"
            }]
    },
    resolve: {
        alias: {
            'src': path.resolve(__dirname, '../src')
        }
    },
    plugins: [
      new ExtractTextPlugin("ko-epui.css")
    ],
    htmlLoader: {
      //ko虚拟dom不能注释
      ignoreCustomComments: [ /^!/, /^( [\/]?ko )(\S|\s)*(\s?)$/]
    }
}
module.exports = config
